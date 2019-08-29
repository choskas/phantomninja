const startButton = document.querySelector('button')
let menu = document.querySelector('#menu')
let gameBoard = document.querySelector('#principal')
const titleAudio = document.querySelector('#titlemusic')
const walkAudio = document.querySelector('#walk')
const startAudio = document.querySelector('#startsound')
const slashAudio = document.querySelector('#slash')
const pickAudio = document.querySelector('#pickcoin')
const winAudio = document.querySelector('#wins')
const enemyAudio = document.querySelector('#enemyappear')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let deadEnemies = 0
let contenemies = 0
let badCharacters = []
let sunCoins = []
let badCharactersTwo = []
let badCharactersThree = []
let badCharactersFour = []
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
        this.img.src = './assets/background2.png'
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
        this.width = 70
        this.height = 100
        this.img = new Image()
        this.img.src = './assets/player1.png'

    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    moveUp() {
        this.y -= 30
    }
    moveDown() {
        this.y += 30
    }
    moveRight() {
        this.x += 30
    }
    moveLeft() {
        this.x -= 30
    }

    isTouchingE(enemy) {
        return (
            this.x < enemy.x + (enemy.width - 40) &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + (enemy.height - 40) &&
            this.y + this.height > enemy.y
        )
    }
    isTouching(sunCoins) {
        return (
            this.x < sunCoins.x + sunCoins.width &&
            this.x + this.width > sunCoins.x &&
            this.y < sunCoins.y + sunCoins.height &&
            this.y + this.height > sunCoins.y
        )
    }
}



class enemigoss {
    constructor(x, y, imagen) {
        this.x = x
        this.y = y
        this.width = 120
        this.height = 140
        this.img = new Image()

        this.img.src = imagen
        this.alive = true

    }
    draw() {
        this.x--
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    drawD() {
        this.x++
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    drawU() {
        this.y++
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    drawF() {
        this.y++
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

}



class Warrior {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 70
        this.height = 100
        this.img = new Image()
        this.img.src = './assets/warrior.png'

    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Sun {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 40
        this.height = 50
        this.img = new Image()
        this.img.src = './assets/sun.png'
        this.alive = true
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

const board = new Board()
const player1 = new Player(canvas.width / 2, canvas.height / 2)
const warrior = new Warrior(800, 200)
//const en=new Enemies(100,50,'algo')




function titleSound() {
    titleAudio.play()
}

function walkSound() {
    walkAudio.play()
}

function startBeep() {
    startAudio.play()

}

function slashSound() {
    slashAudio.play()
}

function pickSound() {
    pickAudio.play()
}

function winSound() {
    winAudio.play()
}

function enemySound() {
    enemyAudio.play()
}

function generateSun() {
    if (frames % 100 === 0) {
        let x = canvas.width
        let y = canvas.height
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)

        sunCoins.push(new Sun(randomX, randomY))
    }
}

function drawSun() {
    sunCoins.forEach(suns => {
        suns.alive = true
        suns.draw()
    })
}

function getSun() {
    sunCoins.forEach((suns, index) => {
        if (player1.isTouching(suns)) {
            score++
            pickSound()
            sunCoins.splice(index, 1) //borra uno del indice, quita soles
        }
    })


}

function winScreen() {

    ctx.font = '30px Courier'
    ctx.fillText(`You win!! DOM is awake! killed Enemies: ${deadEnemies}`, canvas.width / 2 - 400, 400)
    ctx.font = '30px Courier'
    ctx.fillText(`Press "P" to restart!`, canvas.width / 2, 600)
    clearInterval(interval)

}

function youWin() {
    if (score >= 20) {
        winSound()
        return winScreen()
    }
}


function generateEnemie() {

    enemy = new Array()


    enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
    enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
    enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
    enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
    enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
    enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
    enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

    let selecciona = selectEnemy()



    let x = canvas.width
    let y = canvas.height
    let i = new Image()
    let texto
    let valores = new Array()


    if (frames % 100 === 0) {
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)

        texto = enemy[selecciona]
        valores[0] = randomX //deje de utilizar valor random en x codigo original abajo
        valores[1] = randomY
        valores[2] = texto


        badCharacters.push(new enemigoss(canvas.width + 5, valores[1], valores[2]))
        enemySound()





    }
}




// function generateEnemie() {

//     enemy = new Array()


//     enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
//     enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
//     enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
//     enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
//     enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
//     enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
//     enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

//     let selecciona = selectEnemy()



//     let x = canvas.width
//     let y = canvas.height
//     let i = new Image()
//     let texto
//     let valores = new Array()


//     if (frames % 100 === 0) {
//         let randomX = Math.floor((Math.random() * x) + 1)
//         let randomY = Math.floor((Math.random() * y) + 1)

//         texto = enemy[selecciona]
//         valores[0] = randomX  //deje de utilizar valor random en x codigo original abajo
//         valores[1] = randomY
//         valores[2] = texto


//         badCharacters.push(new enemigoss(valores[0], valores[1], valores[2]))
//         enemySound()





//     }
// }

function selectEnemy() {
    let aleatorio = Math.floor((Math.random() * 100) + 1)
    let selection = aleatorio % 7
    return selection
}



function drawScore() {

    ctx.fillStyle = 'white'
    ctx.font = '28px Courier'
    ctx.fillText(`Sun Coins: ${score}`, (canvas.width / 2) + 100, 50)
}

function drawScore2() {

    ctx.fillStyle = 'white'
    ctx.font = '28px Courier'
    ctx.fillText(`Dead Enemies: ${deadEnemies}`, (canvas.width / 2) - 300, 50)
}


function start() {
    menu.style.display = 'none'
    gameBoard.style.display = ''
    interval = setInterval(update, 1000 / 60)

}

function start2() {
    menu.style.display = 'none'
    gameBoard.style.display = ''
    interval = setInterval(update, 500 / 60)

}

function generateEnemie2() {

    enemy = new Array()


    enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
    enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
    enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
    enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
    enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
    enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
    enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

    let selecciona = selectEnemy()



    let x = canvas.width
    let y = canvas.height
    let i = new Image()
    let texto
    let valores = new Array()


    if (frames % 100 === 0) {
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)

        texto = enemy[selecciona]
        valores[0] = randomX
        valores[1] = randomY
        valores[2] = texto


        badCharactersTwo.push(new enemigoss(-100, valores[1], valores[2]))



        //        const enemigos= new Enemies(randomX,randomY,texto)
        //      enemigos.draw()


    }
}

function generateEnemie3() {
    enemy = new Array()


    enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
    enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
    enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
    enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
    enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
    enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
    enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

    let selecciona = selectEnemy()



    let x = canvas.width
    let y = canvas.height
    let i = new Image()
    let texto
    let valores = new Array()


    if (score >= 10 && frames % 100 === 0) {
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)

        texto = enemy[selecciona]
        valores[0] = randomX
        valores[1] = randomY
        valores[2] = texto


        badCharactersThree.push(new enemigoss(randomX, -100, valores[2]))



        //        const enemigos= new Enemies(randomX,randomY,texto)
        //      enemigos.draw()


    }
}

function generateEnemie4() {
    enemy = new Array()


    enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
    enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
    enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
    enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
    enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
    enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
    enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

    let selecciona = selectEnemy()



    let x = canvas.width
    let y = canvas.height
    let i = new Image()
    let texto
    let valores = new Array()


    if (score >= 19) {
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)

        texto = enemy[selecciona]
        valores[0] = randomX
        valores[1] = randomY
        valores[2] = texto


        badCharactersFour.push(new enemigoss(randomX, -100, valores[2]))



        //        const enemigos= new Enemies(randomX,randomY,texto)
        //      enemigos.draw()


    }
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    board.draw()
    player1.draw()
    warrior.draw()
    generateEnemie()
    generateEnemie2()
    generateEnemie3()
    generateEnemie4()
    drawenemies()
    drawenemies2()
    drawenemies3()
    drawenemies4()
    generateSun()
    drawSun()
    getSun()

    drawScore()
    drawScore2()
    killPlayer()
    youWin()

}

function drawenemies() {
    badCharacters.forEach(character => {

        if (character.alive == true)
            character.draw()

    })


}

function drawenemies2() {
    badCharactersTwo.forEach(character => {

        if (character.alive == true)
            character.drawD()

    })


}

function drawenemies3() {
    badCharactersThree.forEach(character => {

        if (character.alive == true)
            character.drawU()

    })


}

function drawenemies4() {
    badCharactersFour.forEach(character => {

        if (character.alive == true)
            character.drawF()

    })


}

function gameOver() {
    ctx.font = '30px Courier'
    ctx.fillText(`Game Over killed Enemies: ${deadEnemies} Sun Coins: ${score}`, canvas.width / 2 - 400, 400)
    ctx.font = '30px Courier'
    ctx.fillText(`Press "P" to restart!`, canvas.width / 2, 600)
    clearInterval(interval)
}

//funcion killplayer = misma funcion
function killPlayer() {
    badCharacters.forEach(character => {
        if (player1.isTouchingE(character)) return gameOver()
    })
    badCharactersTwo.forEach(character => {
        if (player1.isTouchingE(character)) return gameOver()
    })
    badCharactersThree.forEach(character => {
        if (player1.isTouchingE(character)) return gameOver()
    })
    badCharactersFour.forEach(character => {
        if (player1.isTouchingE(character)) return gameOver()
    })
}



function killenemie(xclick, yclick) {
    let xmin = xclick - 100
    let xmax = xclick + 100
    let ymin = yclick - 100
    let ymax = yclick + 100

    badCharacters.forEach(character => {
        if ((character.x >= xmin && character.x <= xmax) && (character.y >= ymin && character.y <= ymax)) {
            character.alive = false
            character.x = 2000
            character.y = 2000
            deadEnemies++

        }
    })
    badCharactersTwo.forEach(character => {
        if ((character.x >= xmin && character.x <= xmax) && (character.y >= ymin && character.y <= ymax)) {
            character.alive = false
            character.x = 2000
            character.y = 2000
            deadEnemies++

        }
    })
    badCharactersThree.forEach(character => {
        if ((character.x >= xmin && character.x <= xmax) && (character.y >= ymin && character.y <= ymax)) {
            character.alive = false
            character.x = 2000
            character.y = 2000
            deadEnemies++

        }
    })
    badCharactersFour.forEach(character => {
        if ((character.x >= xmin && character.x <= xmax) && (character.y >= ymin && character.y <= ymax)) {
            character.alive = false
            character.x = 2000
            character.y = 2000
            deadEnemies++

        }
    })
}

function MoveWarrior(x, y) {
    slashSound()
    warrior.x = x
    warrior.y = y
}
//movimiento mouse 


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,


    }
}

canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);
    MoveWarrior(mousePos.x, mousePos.y)
    killenemie(mousePos.x, mousePos.y)



}, false);


function restart() {
    if (true) {
        location.reload()
    }
}


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
            break
        case 80:
            restart()
            break
        case 32:
            start2()
            startBeep()
            break
        case 48:
            score = score + 1
            break
    }

}