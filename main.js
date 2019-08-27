const startButton = document.querySelector('button')
let menu = document.querySelector('#menu')
let gameBoard = document.querySelector('#principal')
const titleAudio = document.querySelector('#titlemusic')
const walkAudio = document.querySelector('#walk')
const startAudio = document.querySelector('#startsound')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let badCharacters = []
//enemies


window.onload = function () {
    gameBoard.style.display = 'none'
  
}



class Board {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image()
        this.img.src = './assets/background.jpg'
        this.img.onload = () => {
            this.draw()
        }

    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

}

class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 40
        this.height = 75
        this.img = new Image()
        this.img.src = './assets/player1.png'

    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    moveUp() {
        this.y -= 20
    }
    moveDown() {
        this.y += 20
    }
    moveRight() {
        this.x += 20
    }
    moveLeft() {
        this.x -= 20
    }
    
    
}

class Enemies {
    contructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 150
        
        this.enemy = new Array()

        this.enemy[0] = new Image()
        this.enemy[0].src = './assets/Enemies/big_demon_idle_anim_f0.png'
        this.enemy[1] = new Image()
        this.enemy[1].src = './assets/Enemies/big_zombie_idle_anim_f0.png'
        this.enemy[2] = new Image()
        this.enemy[2].src = './assets/Enemies/masked_orc_idle_anim_f0.png'
        this.enemy[3] = new Image()
        this.enemy[3].src = './assets/Enemies/ogre_idle_anim_f0.png'
        this.enemy[4] = new Image()
        this.enemy[4].src = './assets/Enemies/swampy_run_anim_f2.png'
        this.enemy[5] = new Image()
        this.enemy[5].src = './assets/Enemies/wizzart_m_hit_anim_f0.png'
        this.enemy[6] = new Image()
        this.enemy[6].src = './assets/Enemies/zombie_idle_anim_f1.png'

    }
    draw() {
        ctx.drawImage( this.x, this.y, this.width, this.height, this.enemy)
    }
}

class Warrior {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 40
        this.height = 75
        this.img = new Image()
        this.img.src = './assets/warrior.png'

    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

const board = new Board()
const player1 = new Player(100, 600)
const warrior = new Warrior(800, 200)



function titleSound(){
    titleAudio.play()
}

function walkSound (){
    walkAudio.play()
}

function startBeep(){
    startAudio.play()
    
}





function generateEnemie() {
   let x = canvas.width
   let y = canvas.height
    if (frames % 200 === 0) {
        let randomX = Math.floor(Math.random() * (x))
        let randomY = Math.floor(Math.random() * (y))
        badCharacters.push(new Enemies(randomX, randomY))
        
    }
}

function drawEnemy() {
    badCharacters.forEach(enemy => {
        enemy.draw()
    })
}

function drawScore() {
    if (frames % 200 === 0) {
        score += 2
    }
    ctx.fillStyle = 'white'
    ctx.font = '28px Courier'
    ctx.fillText(`Score: ${score}`, (canvas.width / 2) + 100, 50)
}

function start() {
    menu.style.display = 'none'
    gameBoard.style.display = ''
    interval = setInterval(update, 1000 / 60)

}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    board.draw()
    player1.draw()
    warrior.draw()
    generateEnemie()
    drawEnemy()
    drawScore()


}

//movimiento mouse 

    
    function getMousePos(canvas, evt) {
      return {
        x: evt.clientX,
        y: evt.clientY
      }
    }

    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      console.log(message);
      
     
    }, false);

  



document.onkeydown = event => {
    switch (event.keyCode) {
        case 87:
            player1.moveUp()
            walkSound()
            break
        case 65:
            player1.moveLeft()
            walkSound()
            break
        case 83:
            player1.moveDown()
            walkSound()
            break
        case 68:
            player1.moveRight()
            walkSound()
            break
            case 13:
                titleAudio.pause()
                start()
                startBeep()
                break
            case 71:
                titleSound()
    }

}