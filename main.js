const plane = document.querySelector('.plane');
const container = document.querySelector('.container');
const ground = document.querySelector('.ground');
const scoreBorder = document.querySelector('.score');
const refresh = document.querySelector('.refresh_section');

let planeLeft = 220;
let planeBottom = 100;
let gravity = 3;
let space = 450;
let isGameOver = false;
let score = -1;

refresh.addEventListener('click',()=>{
    window.location.reload();
})

function startGame() {
    planeBottom -= gravity
    plane.style.bottom = planeBottom + 'px';
    plane.style.left = planeLeft + 'px';
}

let gameTimer = setInterval(startGame, 20);

function up(e){

    if (e.keyCode===32 || e.keyCode===38){
        if (planeBottom < 500) {
            planeBottom += 50;
            plane.style.bottom = planeBottom + 'px';
        }
    }
}

document.addEventListener('keyup', up);

function addObstacle() {
    let obstacleLeft = 500;
    let obstacleHeight = Math.random() * 60;
    let obstacleBottom = obstacleHeight;
    const botObstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    container.appendChild(botObstacle);
    container.appendChild(topObstacle);


    if (!isGameOver) {
        botObstacle.classList.add('botObstacle');
        topObstacle.classList.add('topObstacle');
        score++;
        scoreBorder.innerHTML = score;
    }
    
    botObstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    botObstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.bottom = obstacleBottom + space + 'px';

    function moveObstacle() {
        obstacleLeft -=2;
        botObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';

        if (obstacleLeft === -60) {
            clearInterval(obstacleTimer);
            container.removeChild(botObstacle);
            container.removeChild(topObstacle);
        }
        if (obstacleLeft > 200 && obstacleLeft < 265 && planeLeft === 220 &&
            (planeBottom < obstacleBottom + 153 || planeBottom > obstacleBottom + space -200)||
            planeBottom <= 0) {
            gameStop();
            clearInterval(obstacleTimer);
        }
    }
    let obstacleTimer = setInterval(moveObstacle, 20); 
    if (!isGameOver){
        setTimeout(addObstacle, 3000);
    }
  

}
addObstacle();

function gameStop(){
    clearInterval(gameTimer);
    isGameOver = true;
    document.removeEventListener('keyup', up);
    ground.classList.add('ground');
    ground.classList.remove('ground-move');
}
