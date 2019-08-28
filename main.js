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
let contenemies=0
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



class enemigoss{
    constructor (x,y,imagen)
    {
        this.x=x
        this.y=y
        this.width=100
        this.height=150
        this.img=new Image()

        this.img.src=imagen
        this.alive=true

    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
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
//const en=new Enemies(100,50,'algo')




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

    enemy = new Array()

    
    enemy[0] = './assets/Enemies/big_demon_idle_anim_f0.png'
    enemy[1] = './assets/Enemies/big_zombie_idle_anim_f0.png'
    enemy[2] = './assets/Enemies/masked_orc_idle_anim_f0.png'
    enemy[3] = './assets/Enemies/ogre_idle_anim_f0.png'
    enemy[4] = './assets/Enemies/swampy_run_anim_f2.png'
    enemy[5] = './assets/Enemies/wizzart_m_hit_anim_f0.png'
    enemy[6] = './assets/Enemies/zombie_idle_anim_f1.png'

   let selecciona= selectEnemy()
  
   

   let x = canvas.width
   let y = canvas.height
   let i=new Image()
    let texto
    let valores = new Array()


    if (frames % 200 === 0) {
        let randomX = Math.floor((Math.random() * x) + 1)
        let randomY = Math.floor((Math.random() * y) + 1)
     
      texto =enemy[selecciona]
    valores[0]=randomX
    valores[1]=randomY
    valores[2]=texto
  

  badCharacters.push(new enemigoss(valores[0],valores[1],valores[2]))
  
 

//        const enemigos= new Enemies(randomX,randomY,texto)
  //      enemigos.draw()
        
        
    }
}

function selectEnemy(){
    let aleatorio = Math.floor((Math.random() * 100) + 1)
    let selection = aleatorio % 7
    return selection 
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
   
   drawenemies()
   
    drawScore()


}
function drawenemies() 
{
    badCharacters.forEach(character =>{
        
        if (character.alive==true)
        character.draw()
        
       })
    

}

//funcion killplayer = misma funcion

function killenemie(xclick,yclick)
{
    let xmin=xclick-100
    let xmax=xclick+100
    let ymin=yclick-100
    let ymax=yclick+100

    badCharacters.forEach(character=>{
        if ((character.x>=xmin && character.x<= xmax) && (character.y>=ymin && character.y<= ymax) )
        {
            character.alive=false

        }
    })

}
function MoveWarrior(x,y)
{

    warrior.x=x
    warrior.y=y
}
//movimiento mouse 

    
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,

        
      }
    }

    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      console.log(message);
     MoveWarrior(mousePos.x,mousePos.y)
     killenemie(mousePos.x, mousePos.y)

     
     
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