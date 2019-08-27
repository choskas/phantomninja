const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
const enemy = []
//enemies
let imgArray = new Array()

imgArray[0] = new Image()
imgArray[0].src = './assets/Enemies/big_demon_idle_anim_f0.png'
imgArray[1] = new Image()
imgArray[1].src = './assets/Enemies/big_zombie_idle_anim_f0.png'
imgArray[2] = new Image()
imgArray[2].src = './assets/Enemies/masked_orc_idle_anim_f0.png'
imgArray[3] = new Image()
imgArray[3].src = './assets/Enemies/ogre_idle_anim_f0.png'
imgArray[4] = new Image()
imgArray[4].src = './assets/Enemies/swampy_run_anim_f2.png'
imgArray[5] = new Image()
imgArray[5].src = './assets/Enemies/wizzart_m_hit_anim_f0.png'
imgArray[6] = new Image()
imgArray[6].src = './assets/Enemies/zombie_idle_anim_f1.png'



 


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
        this.x = 50
        this.y = 600
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
    contructor(x, y, image) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 150
        this.img = new Image()
        this.img.src = image

    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

const board = new Board()
const player1 = new Player()







function generateEnemie() {

    if (frames % 200 === 0) {
   randomImg = Math.floor(Math.random()*(imgArray.length))
   randomX = Math.floor(Math.random()*(canvas.width))
   randomY = Math.floor(Math.random()*(canvas.height))
   
   enemy.push(new Enemies(randomX, randomY, imgArray[randomImg]))
   
    }


}

function drawEnemy() {
    enemy.forEach(enemies => {
        enemies.draw()
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
 
    interval = setInterval(update, 1000 / 60)

}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    board.draw()
    player1.draw()
    drawEnemy()
    drawScore()


}


document.onkeydown = event => {
    switch (event.keyCode) {
        case 87:
            player1.moveUp()
            break
        case 65:
            player1.moveLeft()
            break
        case 83:
            player1.moveDown()
            break
        case 68:
            player1.moveRight()
            break
        case 13:
            start()
            break

    }
    
}