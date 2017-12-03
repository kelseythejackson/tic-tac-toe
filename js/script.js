(() => {
    const body = document.querySelector('body'),
        playerList = document.querySelector('ul'),
        o = playerList.firstElementChild,
        x = playerList.lastElementChild,
        header = document.querySelector('header'),
        board = document.querySelector('.boxes'),
        boxes = board.children,
        playerNames = [];
    let counter = 0;
    function Player(playerId, icon) {
        this.playerId = playerId;
        this.icon = `url("img/${icon}.svg")`;
        this.isActive = false;
        this.didWin = false;
        this.togglePlayerStatus = () => {
            if (!this.isActive) {
                this.isActive = true;
                return this.isActive;
            } else {
                this.isActive = false;
            }
        };
    }



    const player1 = new Player(1, 'o');
    const player2 = new Player(2, 'x');
    const gamePlay = {
        isTwoPlayer: false,
        isOnePlayer: false,
        gameWon: false
    }

    function createOverlayscreen(screenType, id, buttonText) {
        const element = document.createElement('div'),
            header = document.createElement('header'),
            h1 = document.createElement('h1'),
            a = document.createElement('a');
        element.classList.add('screen', `screen-${screenType}`);
        element.id = id;
        a.href = '#';
        a.classList.add('button');
        a.textContent = buttonText;
        h1.textContent = 'Tic Tac Toe';
        header.appendChild(h1);
        header.appendChild(a);
        element.appendChild(header);
        return element;
    }


    function startGame() {
        const startGameDiv = createOverlayscreen('start', 'start', 'Two player game');
        const onePlayerButton = document.createElement('a');
        onePlayerButton.classList.add('button');
        onePlayerButton.textContent = 'One player game';
        startGameDiv.children[0].appendChild(onePlayerButton);
        const nameParagraph = document.createElement('p');
        nameParagraph.classList.add('player-name');
        body.appendChild(startGameDiv);
        const twoPlayerButton = document.querySelector('a.button');

        twoPlayerButton.addEventListener('click', () => {
        
            gamePlay.isTwoPlayer = true;
            
            let playerOneName = prompt('Enter Player 1\'s Name to proceed');
            
            while (playerOneName === null || playerOneName === '') {
                playerOneName = prompt('Enter Player 1\'s Name to proceed');
            }
            let playerTwoName = prompt('Enter Player 2\'s Name to proceed');
            while (playerTwoName === null || playerTwoName === '') {
                playerTwoName = prompt('Enter Player 2\'s Name to proceed');
            }
            playerNames.push(playerOneName, playerTwoName);
            
            nameParagraph.textContent = `${playerOneName} vs ${playerTwoName}`;

            header.appendChild(nameParagraph);

            body.removeChild(startGameDiv);
        });
        onePlayerButton.addEventListener('click', () => {
            gamePlay.isOnePlayer = true;
            
            let playerOneName = prompt('Enter Player 1\'s Name to proceed');
            while (playerOneName === null || playerOneName === '') {
                playerOneName = prompt('Enter Player 1\'s Name to proceed');
            }
            playerNames.push(playerOneName);
            
            nameParagraph.textContent = `${playerOneName} vs The Machine`;
            header.appendChild(nameParagraph);

            body.removeChild(startGameDiv);
        });


        player1.togglePlayerStatus();
        if (player1.isActive) {
            o.classList.add('active');

        }

    }
    function gameOver(playerId) {
        const gameOverScreen = createOverlayscreen('win', 'finish', 'New game');
        const message = document.createElement('p');
        if (gamePlay.isTwoPlayer) {
            if (playerId === 1) {

                gameOverScreen.classList.add(`screen-win-one`);
                message.textContent = `${playerNames[0]} Wins`;
                gameOverScreen.children[0].insertBefore(message, gameOverScreen.children[0].lastElementChild);
                player1.didWin = true;
                
            } else if (playerId === 2) {
                gameOverScreen.classList.add(`screen-win-two`);
                message.textContent = `${playerNames[1]} Wins`;
                gameOverScreen.children[0].insertBefore(message, gameOverScreen.children[0].lastElementChild);
                player2.didWin = true;
                ;
            }
        } else if (gamePlay.isOnePlayer) {
            if (playerId === 1) {
                gameOverScreen.classList.add(`screen-win-one`);
                message.textContent = `${playerNames[0]} Wins`;
                gameOverScreen.children[0].insertBefore(message, gameOverScreen.children[0].lastElementChild);
                player1.didWin = true;
                
            } else if (playerId === 2) {
                gameOverScreen.classList.add(`screen-win-two`);
                message.textContent = 'The Machine Wins';
                gameOverScreen.children[0].insertBefore(message, gameOverScreen.children[0].lastElementChild);
                player2.didWin = true;
                
            }
        }


        body.appendChild(gameOverScreen);
        const newGameButton = document.querySelector('a.button');
        newGameButton.addEventListener('click', () => {
            location.reload(true);

        });
    }
    function tieGame() {
        const tieGameScreen = createOverlayscreen('win', 'finish', 'New game');
        const message = document.createElement('p');
        tieGameScreen.classList.add('screen-win-tie');
        message.textContent = 'Tie Game';
        tieGameScreen.children[0].insertBefore(message, tieGameScreen.children[0].lastElementChild);
        body.appendChild(tieGameScreen);
        const newGameButton = document.querySelector('a.button');
        newGameButton.addEventListener('click', () => {
            location.reload();
        });
        
    }

    function ComputerAI() {
        let emptySquares = [];
        if (player2.isActive) {
            
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].classList.length < 2) {
                    emptySquares.push(boxes[i]);
                }
            }
          
            for (let e = 0; e < emptySquares.length; e++) {
                let square = (Math.floor(Math.random() * emptySquares.length));
               
                if (!player1.didWin) {
                    
                    setTimeout(() => {
                        emptySquares[square].classList.add('box-filled-2');
                        setTimeout(() => {
                            checkSquares(2);
                        }, 200);
                        player1.togglePlayerStatus();
                        player2.togglePlayerStatus();
                        x.classList.remove('active');
                        o.classList.add('active');
                        counter++;
                        
                    }, 200);
                    break;
                }

            }
        }
      

    }

    function checkSquares(playerId) {
        const boxesFilled = [];
        for (let i = 0; i <= 6; i += 3) {
            if (counter <= 9 && boxes[i].classList.contains(`box-filled-${playerId}`) && boxes[i + 1].classList.contains(`box-filled-${playerId}`) && boxes[i + 2].classList.contains(`box-filled-${playerId}`)) {
                console.log(`Player ${playerId} wins`);
                gamePlay.gameWon = true;
                gameOver(playerId);
            } 
        }

        for (let i = 0; i <= 2; i++) {
            console.log(boxes[i]);
            console.log(boxes[i + 3]);
            console.log(boxes[i + 6]);
        }

        for (let i = 0; i <= 1; i += 4) {
            if (counter <= 9 && boxes[i].classList.contains(`box-filled-${playerId}`) && boxes[i + 4].classList.contains(`box-filled-${playerId}`) && boxes[i + 8].classList.contains(`box-filled-${playerId}`)) {
                console.log(`Player ${playerId} wins`);
                gameOver(playerId);
            }
        
        }

        for (let i = 0; i <= 1; i += 2) {
            if (counter <= 9 && boxes[i + 2].classList.contains(`box-filled-${playerId}`) && boxes[i + 4].classList.contains(`box-filled-${playerId}`) && boxes[i + 6].classList.contains(`box-filled-${playerId}`)) {
                console.log(`Player ${playerId} wins`);
                gameOver(playerId);
            }
          
        }

        for (let i = 0; i < boxes.length; i++) {
            if(boxes[i].classList.length === 2) {
                boxesFilled.push(boxes[i]);
            }
            if(boxesFilled.length === 9 && !gamePlay.gameWon) {
                tieGame();
            }
        }
        
    }
    board.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'LI') {
            if (player1.isActive) {
                if (e.target.classList.length < 2) {
                    e.target.style.backgroundImage = player1.icon;
                }
            } else if (player2.isActive) {
                if (e.target.classList.length < 2) {
                    e.target.style.backgroundImage = player2.icon;
                }
            }
        }
    });

    board.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'LI') {
            if (player1.isActive) {
                if (e.target.classList.length < 2) {
                    e.target.style.backgroundImage = '';
                }
            } else if (player2.isActive) {
                if (e.target.classList.length < 2) {
                    e.target.style.backgroundImage = '';
                }
            }
        }
    });
    board.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            if (gamePlay.isTwoPlayer) {
                if (player1.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.classList.add('box-filled-1');
                        o.classList.remove('active');
                        x.classList.add('active');
                        counter++;
                        checkSquares(1);
                        player1.togglePlayerStatus();
                        player2.togglePlayerStatus();
                    }
                } else if (player2.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.classList.add('box-filled-2');
                        x.classList.remove('active');
                        o.classList.add('active');
                        counter++;
                        checkSquares(2);
                        player2.togglePlayerStatus();
                        player1.togglePlayerStatus();
                    }
                }
            } else if (gamePlay.isOnePlayer) {
                if (player1.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.classList.add('box-filled-1');
                        o.classList.remove('active');
                        x.classList.add('active');
                        counter++;
                        checkSquares(1);
                        player1.togglePlayerStatus();
                        player2.togglePlayerStatus();
                        ComputerAI();
                    }
                }
            }

        }
    });

    startGame();

})();