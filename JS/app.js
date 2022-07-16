const buttons = document.querySelector('#buttons');
const btnInit = document.querySelector('#btn-init');
const btnStop = document.querySelector('#btn-stop');
var myScore = document.querySelector('#my-score');
var machiScore = document.querySelector('#machine-score');
var btnReset = document.querySelector('#btn-reset');
// const canvas = document.querySelector('#container-canvas');

let score = 0;
var scoreMachine = 0;
var yourScore = 0;

var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
// pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 1000, 600);

var raio = 10;
var xAleatorio;
var yAleatorio;

buttons.addEventListener('click', function (e) {
    e.preventDefault();
    const value = e.target;

    if (value === btnInit) {
        console.log('iniciar');         
        startGame();
        
        // btnInit.opacity = 2;      
    } else if (value === btnStop) {
        stop();
    }else if (value === btnReset) {
        reset();    
        
    }    
});

function startGame() {
    btnInit.disabled = true;
    btnStop.disabled = false;
    tela.style.display = '';
    machiScore.innerText = scoreMachine;  
    myScore.innerText = yourScore;
    btnInit.focus = true;
    // btnStop.disabled = true;
    btnReset.disabled = true;
}

function reset() {
    document.location.reload(true);
}

function stop(){
    console.log('Stop');
    tela.style.display = 'none';
    btnInit.disabled = false;
    btnStop.disabled = true;
    btnReset.disabled = false;
}

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpaTela() {
    pincel.clearRect(0, 0, 1000, 600);
}

function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 20, 'red');
    desenhaCirculo(x, y, raio + 10, 'white');
    desenhaCirculo(x, y, raio, 'red');
}

function sorteiaPosicao(maximo) {
    return Math.floor(Math.random() * maximo);
}

function atualizaTela() {
    limpaTela();
    xAleatorio = sorteiaPosicao(1000);
    yAleatorio = sorteiaPosicao(600);
    desenhaAlvo(xAleatorio, yAleatorio);
}

function gameOver(){
    let gameOverLayer = document.getElementById("gameOver");
        gameOverLayer.style.display = 'flex';
}

function checkGameOver(){
    if(scoreMachine >= 3){
        scoreMachine;
        console.log('winner maquina');
        tela.style.display = 'none';
        gameOver()
    }else if(yourScore >= 3){
        yourScore;
        console.log('winner eu');
        tela.style.display = 'none';
        gameOver();
    }
}

function restart() {
    startGame();
    reset();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}

setInterval(atualizaTela, 1000);

function dispara(evento) {
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    if ((x > xAleatorio - raio)
        && (x < xAleatorio + raio)
        && (y > yAleatorio - raio)
        && (y < yAleatorio + raio)) {
        desenhaCirculo(x, y, raio + 200, 'red');
        yourScore++;
        myScore.innerText = yourScore;
        checkGameOver();

        console.log('meus pontos', yourScore);
    } else {
        scoreMachine++;
        machiScore.innerText = scoreMachine;
        checkGameOver();        
    }

}
tela.onclick = dispara;

