const buttons = document.querySelector('#buttons');
const btnInit = document.querySelector('#btn-init');
const btnStop = document.querySelector('#btn-stop');
var myScore = document.querySelector('#my-score');
var machiScore = document.querySelector('#machine-score');
var btnReset = document.querySelector('#btn-reset');

let score = 0;
var scoreMachine = 0;
var yourScore = 0;

var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
// pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 1000, 600);

var raio = 20;
var xAleatorio;
var yAleatorio;

buttons.addEventListener('click', function (e) {
    e.preventDefault();
    const value = e.target;

    if (value === btnInit) {
        console.log('iniciar');
        tela.style.display = ''; 
        machiScore.innerText = scoreMachine;  
        myScore.innerText = yourScore;
        btnInit.disabled = true;
        btnStop.disabled = false;
        btnInit.opacity = 2;      
    } else if (value === btnStop) {
        console.log('Stop');
        tela.style.display = 'none';
        btnInit.disabled = false;
        btnStop.disabled = true;
    }else if (value === btnReset) {
        console.log('reset clicked');
        document.location.reload(true);
    }    
});

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

        console.log('meus pontos', yourScore);
    } else {
        scoreMachine++;
        machiScore.innerText = scoreMachine;
        if(scoreMachine >= 3){
            // var divNova = document.createElement('div');
            // var vendedor = document.createTextNode(`O vencedor é o oponente com  ${scoreMachine} pontos`)
            // divNova.appendChild(vendedor);

            // var divAtual = document.getElementById('canvas');
            // document.body.insertBefore(divNova, divAtual);
        }
    }

}
tela.onclick = dispara;

