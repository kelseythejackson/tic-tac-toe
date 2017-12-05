(() => {
    //Get DOM elements
    const body = document.querySelector('body'),
        playerList = document.querySelector('ul'),
        o = playerList.firstElementChild,
        x = playerList.lastElementChild,
        header = document.querySelector('header'),
        board = document.querySelector('.boxes'),
        boxes = board.children,
        playerNames = []; // Declare and Array of names to display in the dome

    function Player(playerId, icon) { // This function creates the Player object
        this.playerId = playerId;
        this.icon = `url("img/${icon}.svg")`;
        this.isActive = false;
        this.didWin = false;
    }

    // Create two players
    const player1 = new Player(1, 'o');
    const player2 = new Player(2, 'x');

    const gamePlay = { // This object is used to active a two player game, one player game, and if the game has been won.
        isTwoPlayer: false,
        isOnePlayer: false,
        isTie: false
    }

    function togglePlayerStatus() {
        if (!player1.isActive) {
            player1.isActive = true;
            o.classList.add('active');
            if (player2.isActive && x.classList.contains('active')) {
                player2.isActive = false;
                x.classList.remove('active');
            }
            console.log(`player 1 is active: ${player1.isActive}`);
        } else if (!player2.isActive) {
            player2.isActive = true;
            x.classList.add('active');
            if (player1.isActive && o.classList.contains('active')) {
                player1.isActive = false;
                o.classList.remove('active');
            }
            console.log(`player 2 is active: ${player2.isActive}`);
        }
    }

    function createOverlayscreen(screenType, id, buttonText) { // Creates an overlay screen based on if the game is starting, if either player has one, or if it's a tie.
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

    function getPlayerName(id) {
        let name = prompt(`Enter Player ${id}'s Name to proceed`);
        while (name === null || name === '') {
            name = prompt('Enter Player 1\'s Name to proceed');
        }
        return name;
    }

    function startGame() { // This function starts the game
        const startGameDiv = createOverlayscreen('start', 'start', 'Two player game');
        // creates the additional button for single play and appends it to the start overlay screen
        const onePlayerButton = document.createElement('a');
        onePlayerButton.classList.add('button');
        onePlayerButton.textContent = 'One player game';
        startGameDiv.children[0].appendChild(onePlayerButton);

        // Creates the paragraph element that will hold the player name(s) and add a class to it
        const nameParagraph = document.createElement('p');
        nameParagraph.classList.add('player-name');

        // Adds the start game div to the DOM
        body.appendChild(startGameDiv);

        //Selects the two player button
        const twoPlayerButton = document.querySelector('a.button');

        twoPlayerButton.addEventListener('click', () => {
            gamePlay.isTwoPlayer = true;

            const playerOneName = getPlayerName(1);
            const playerTwoName = getPlayerName(2);

            playerNames.push(playerOneName, playerTwoName);

            nameParagraph.textContent = `${playerOneName} vs ${playerTwoName}`;

            header.appendChild(nameParagraph);
            body.removeChild(startGameDiv);
        });
        onePlayerButton.addEventListener('click', () => {
            gamePlay.isOnePlayer = true;

            const playerOneName = getPlayerName(1);
            playerNames.push(playerOneName);

            nameParagraph.textContent = `${playerOneName} vs The Machine`;
            header.appendChild(nameParagraph);

            body.removeChild(startGameDiv);
        });

        togglePlayerStatus();
    }

    function buildGameOverScreen(screenType, playerIndex) {
        const gameOverScreen = createOverlayscreen('win', 'finish', 'New game');
        const message = document.createElement('p');
        gameOverScreen.classList.add(`screen-win-${screenType}`);
        if (gamePlay.isTie) {
            message.textContent = 'Tie Game';
        } else if (gamePlay.isTwoPlayer && !gamePlay.isTie) {
            message.textContent = `${playerNames[playerIndex]} Wins`;
        } else if (gamePlay.isOnePlayer && player1.didWin) {
            message.textContent = `${playerNames[playerIndex]} Wins`;
        } else if (gamePlay.isOnePlayer && player2.didWin) {
            message.textContent = 'The Machine Wins';
        }

        gameOverScreen.children[0].insertBefore(message, gameOverScreen.children[0].lastElementChild);
        body.appendChild(gameOverScreen);
        const newGameButton = document.querySelector('a.button');
        newGameButton.addEventListener('click', () => {
            location.reload();
        });
    }

    function gameOver(playerId) {
        if (gamePlay.isTwoPlayer) {
            if (playerId === 1) {
                buildGameOverScreen('one', 0);
            } else if (playerId === 2) {
                buildGameOverScreen('two', 1);
            }
        } else if (gamePlay.isOnePlayer) {
            if (playerId === 1) {
                buildGameOverScreen('one', 0);
            } else if (playerId === 2) {
                buildGameOverScreen('two', 1);
            }
        }
    }

    function tieGame() {
        buildGameOverScreen('tie')
    }

    function loopOverBoxes(end, iterator, playerId, num1, num2, num3) {
        for (let i = 0; i <= end; i += iterator) {
            if (boxes[i + num1].classList.contains(`box-filled-${playerId}`) && boxes[i + num2].classList.contains(`box-filled-${playerId}`) && boxes[i + num3].classList.contains(`box-filled-${playerId}`)) {
                if (playerId === 1) {
                    player1.didWin = true;
                } else if (playerId === 2) {
                    player2.didWin = true;
                }
                gameOver(playerId);
            }
        }
    }

    function checkSquares(playerId) {
        loopOverBoxes(6, 3, playerId, 0, 1, 2);
        loopOverBoxes(2, 1, playerId, 0, 3, 6);
        loopOverBoxes(1, 4, playerId, 0, 4, 8);
        loopOverBoxes(1, 2, playerId, 2, 4, 6);

        const boxesFilled = [];
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].classList.length === 2) {
                boxesFilled.push(boxes[i]);
            }
            if (boxesFilled.length === 9 && !player1.didWin && !player2.didWin) {
                gamePlay.isTie = true;
                tieGame();
            }
        }
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
                        }, 250);
                        togglePlayerStatus();
                    }, 500);
                    break;
                }
            }
        }
    }

    board.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'LI') {
            if (gamePlay.isTwoPlayer) {
                if (player1.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.style.backgroundImage = player1.icon;
                    }
                } else if (player2.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.style.backgroundImage = player2.icon;
                    }
                }
            } if (gamePlay.isOnePlayer) {
                if (player1.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.style.backgroundImage = player1.icon;
                    }
                } else {
                    e.target.style.backgroundImage = '';
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
                        checkSquares(1);
                        togglePlayerStatus();
                    }
                } else if (player2.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.classList.add('box-filled-2');
                        checkSquares(2);
                        togglePlayerStatus();
                    }
                }
            } else if (gamePlay.isOnePlayer) {
                if (player1.isActive) {
                    if (e.target.classList.length < 2) {
                        e.target.classList.add('box-filled-1');
                        checkSquares(1);
                        togglePlayerStatus();
                        ComputerAI();
                    }
                }
            }
        }
    });

    startGame();

})();