(()=>{
    const log = (arg) => console.log(arg);
    const body = document.querySelector('body'),
    player1 = document.getElementById('player1'),
    player2 = document.getElementById('player2'),
    box = document.querySelector('.boxes')
    boxes = box.children;

    
  

    function startGame() {
        const startGame = document.createElement('div');
        startGame.classList.add('screen');
        startGame.classList.add('screen-start');
        startGame.innerHTML = `
            <header>
                <h1>Tic Tac Toe</h1>
                <a href="#" class="button">Start game</a>
            </header>
        `;
        body.appendChild(startGame);
        const startButton = document.querySelector('a.button');
        startButton.addEventListener('click', ()=> {
            body.removeChild(startGame);
        });
        
        
    }

   

    startGame();
    
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('mouseenter', ()=> {
                
                boxes[i].textContent = 'clicked'
            });
            boxes[i].addEventListener('mouseout', ()=> {
               
                boxes[i].textContent = ''
            });
        };
  
    player1.classList.add('active');
    

    log(player1);
    log(player2);
    log(boxes);
   
})();