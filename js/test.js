(()=>{
    const body = document.querySelector('body'),
          playerList = document.querySelector('ul'),
          player1 = playerList.firstElementChild,
          player2 = playerList.lastElementChild,
          box = document.querySelector('.boxes'),
          boxes = box.children;
    let turnCounter = 0;

    
    

    function checkSquares(player, playerId) {
        for (let i = 0; i <= 6; i += 3) {
            if(turnCounter <= 9 && boxes[i].classList.contains(`box-filled-${playerId}`) && boxes[i + 1].classList.contains(`box-filled-${playerId}`) && boxes[i + 2].classList.contains(`box-filled-${playerId}`)){
                console.log(`${player} wins`);
                gameOver(player);
            } else if (turnCounter === 9){
                tieGame();
                break;
             }    
        }

        for (let i = 0; i <= 2; i++) {
            if(boxes[i].classList.contains(`box-filled-${playerId}`) && boxes[i + 3].classList.contains(`box-filled-${playerId}`) && boxes[i + 6].classList.contains(`box-filled-${playerId}`)){
                console.log(`${player} wins`);
                gameOver(player);
            }
        }

        for(let i = 0; i <= 2; i += 4){
            if(boxes[i].classList.contains(`box-filled-${playerId}`) && boxes[i + 4].classList.contains(`box-filled-${playerId}`) && boxes[i + 8].classList.contains(`box-filled-${playerId}`)){
                console.log(`${player} wins`);
                gameOver(player);
            }
        }

        for(let i = 0; i <= 2; i += 2){
            if(boxes[i + 2].classList.contains(`box-filled-${playerId}`) && boxes[i + 4].classList.contains(`box-filled-${playerId}`) && boxes[i + 6].classList.contains(`box-filled-${playerId}`)){
                console.log(`${player} wins`);
                gameOver(player);
            }
        }
    }

    function makeNextPlayerActive() {
        const players = playerList.children;
        for(let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.classList.contains('active')) {
                player.classList.remove('active');
            } else {
                player.classList.add('active');
                if(player.classList.contains('active') && player.id === 'player2') {
                    computerAI();
                }
            }
        }
    }

    // function returnPlayerName(name) {
    //     const playerName = name;
    //     return playerName;
    // }

    function computerAI () {
        let emptySquares = [];
        if(player2.classList.contains('active')) {
            let square = (Math.floor( Math.random() * 8));
            for (let i = 0; i < boxes.length; i++) {
                if(boxes[i].classList.length < 2) {
                    console.log(i);
                    emptySquares.push(boxes[i]); 
                    for (let e = 0; e < 1; e++) {
                        // emptySquares[e].classList.add('box-filled-2');
                        
                       
                        setTimeout(() => {
                            emptySquares[e].classList.add('box-filled-2');
                            // player2.classList.remove('active');
                            // player1.classList.add('active');
                           
                             
                        }, 2000);
                        
                        break;
                    }
                    
                    
                    
                    
                    // emptySquares.push(boxes[i]);
                    // console.log(emptySquares.indexOf(emptySquares.splice(Math.floor( Math.random() * emptySquares.length), 0)));
                    // break;
                   
                    // for (let j = 0; j < emptySquares.length; j++) {
                    //     // emptySquares[Math.floor( Math.random() * emptySquares.length)].classList.add('box-filled-2');
                       
                    //     console.log(emptySquares[Math.floor( Math.random() * emptySquares.length)]);
                    //     break;
                        
                        
                    // }
                    // setTimeout(() => {
                    //     boxes[square].classList.add('box-filled-2');
                    // }, 500);
                    // makeNextPlayerActive();
                    // break;
                    
                }
                
            }
            // makeNextPlayerActive();
        }
        makeNextPlayerActive();
    }

    function startGame() {
        const startGameDiv = document.createElement('div');
        startGameDiv.classList.add('screen');
        startGameDiv.classList.add('screen-start');
        startGameDiv.innerHTML = `
            <header>
                <h1>Tic Tac Toe</h1>
                <input type="text" placeholder="Player 1 name" id="player-name-input" class="player-name-input">
                <a href="#" class="button">Start game</a>
            </header>
        `;
        body.appendChild(startGameDiv);
        const startButton = document.querySelector('a.button'),
              playerNameInput = document.getElementById('player-name-input');
        startButton.addEventListener('click', ()=> {
            body.removeChild(startGameDiv);
            const playerName = document.createElement('p');
            playerName.classList.add('player-name');
            playerName.textContent = `${playerNameInput.value} vs The Machine`;
            player1.parentNode.parentNode.appendChild(playerName);
            console.log(playerNameInput.value);

        });
        player1.classList.add('active');

        
    }

    function gameOver(player) {
        const winnerDiv = document.createElement('div');
              winnerDiv.classList.add('screen');
              winnerDiv.classList.add('screen-win');
              winnerDiv.id = 'finish';
              winnerDiv.innerHTML = `
                <header>
                    <h1>Tic Tac Toe</h1>
                    <p class="message"></p>
                    <a href="#" class="button">New game</a>
                </header>
              `;
        if(player1.classList.contains('active')) {
            winnerDiv.classList.add('screen-win-one');
        } else if (player2.classList.contains('active')) {
            winnerDiv.classList.add('screen-win-two');
        }
        body.appendChild(winnerDiv);
        const newGameButton = document.querySelector('a.button'),
              message = document.querySelector('.message');
        newGameButton.addEventListener('click', () => {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].className = 'box';
                
            }
          body.removeChild(winnerDiv);
          turnCounter = 0;
          if(player2.classList.contains('active')) {
              player2.classList.remove('active');
          }
          player1.classList.add('active');
            
        });
        message.textContent = `Winner`;

    }

    function tieGame() {
        const tieGameDiv = document.createElement('div');
        tieGameDiv.classList.add('screen');
        tieGameDiv.classList.add('screen-win');
        tieGameDiv.id = 'finish';
        tieGameDiv.innerHTML = `
        <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
    </header>
        `;
        tieGameDiv.classList.add('screen-win-tie');
        body.appendChild(tieGameDiv);
        const newGameButton = document.querySelector('a.button'),
              message = document.querySelector('.message');
        newGameButton.addEventListener('click', ()=> {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].className = 'box';
                
            }
            body.removeChild(tieGameDiv);
            turnCounter = 0;
            if(player2.classList.contains('active')) {
                player2.classList.remove('active');
            }
            player1.classList.add('active');
        });
        message.textContent = `Tie Game`;
          
    }

    box.addEventListener('mouseover', (e)=>{
        if(e.target.tagName === 'LI') {
            if(player1.classList.contains('active')) {
                if(e.target.classList.length < 2) {
                    e.target.style.backgroundImage = 'url("img/o.svg")';
                }
            } else if (player2.classList.contains('active')) {
                if(e.target.classList.length < 2) {
                    e.target.style.backgroundImage = 'url("img/x.svg")'; 
                }
            }
        } 
    });

    box.addEventListener('mouseout', (e)=>{
        if(e.target.tagName === 'LI') {
            if(player1.classList.contains('active')) {
                if(e.target.style.backgroundImage !== '') {
                    e.target.style.backgroundImage = '';
                } 
            } else if (player2.classList.contains('active')) {
                if(e.target.style.backgroundImage !== '') {
                    e.target.style.backgroundImage = '';
                }
            }
        } 
    });

    box.addEventListener('click', (e)=>{
        if(e.target.tagName === 'LI') {
            if(player1.classList.contains('active')) {
                e.target.classList.add('box-filled-1');
                turnCounter++;
                checkSquares('Player 1', 1);
                makeNextPlayerActive();   
                console.log(`Turn count is ${turnCounter}`); 
            } else if (player2.classList.contains('active')) {
                e.target.classList.add('box-filled-2');
                turnCounter++;
                checkSquares('Player 2', 2);
                makeNextPlayerActive();  
                console.log(`Turn count is ${turnCounter}`); 
            }
        }
    });

    startGame();
})();