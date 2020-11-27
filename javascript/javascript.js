const LEFT = 37
const RIGHT = 39
const UP = 38
const DOWN = 40

const height = 20
const width = 20

let snakedelay = 40
let alterdelay = () =>{
    snakedelay = document.getElementById('delay').value
}

let interval
let running = true

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

let playerboard = document.querySelector('ui.playerboard')
let playerboardscore = document.createElement('li')

let playername = undefined
let placar = document.querySelector('p#placar')

class Player{
    constructor(){
        this.getName = () =>{
            if(sessionStorage.getItem('name') == null){
                let name = prompt('Qual o seu nome Jogador?').toLowerCase()
                sessionStorage.setItem('name', name)
                return name

            } return sessionStorage.getItem('name')
        }
        this.name = this.getName()
        this.points = 0
    }
}

class ScoreBoard{
    constructor(){
        this.pullScore = (scorefile) => {
            this.scores = JSON.parse(scorefile);
        }

        this.get_scores = (callback = this.pullScore) => {
            let file = "./javascript/score.json";
          
            fetch(file, {cache: 'no-cache'})
              .then(function(response) {
                  if (response.status !== 200) {
                    alert('Erro buscando pontuções ;-;')
                  }
                  response.json().then(function(data) {
                    let scores = JSON.stringify(data);
                    callback (scores);
                    return scores;
                  });
                })
              .catch(function(err) {
                alert('Erro buscando pontuções ;-;')
              });
          }

        this.scores = this.get_scores()
        this.scoreboardHTML = document.querySelector('ul.scoreboard')
        this.li = document.createElement('li')        
    }

    updateScore(){
        JSON.stringify(this.scores)
    }

    sortScore(){
        for (let i = this.scores.length -1; i >= 0; i--){
            let obj = this.scores[i]
            if (obj["index"] > this.scores[0]["index"]){
                this.scores.unshift(obj)
                this.scores.pop(i)
            }
        }
    }

    pushScore(){
        let newscore = {index: player.points / snakedelay, 
                        player: player.name,
                        score: player.points,
                        speed: snakedelay}
        
        this.scores.push(newscore)
        this.sortScore()
    }
    
}

class Screen {
    constructor(height=10,width=10){
        this.height = height
        this.width = width
    }
}

class Snake {
    constructor(){

        this.body = [{x:Math.floor(width / 2),y:Math.floor(height / 2)}]
    }

    RenderSnake(){
        for (let i in this.body){
            let snakepart = this.body[i]
            this.PrintSnakePart(snakepart)
        }
    }

    PrintSnakePart(SnakePart){
        context.fillStyle = 'green'
        context.fillRect(SnakePart.x,SnakePart.y,1,1)
    }


    AddPoint(){
        
        let LastSnakePart = this.body[this.body.length -1]
        var SnakePart = {x:LastSnakePart.x,y:LastSnakePart.y}

        this.body.push(SnakePart)
        player.points++
        placar.innerHTML = player.points
    }

    Movement(axysx,axysy){
        for (let peer of this.body){
            if (peer.x === axysx && peer.y === axysy){
                alert(`Você Perdeu! Mas fez ${this.points} pontos ☺`)
                clearInterval(interval)
                document.location.reload(true)
                break;
            }

        }
        this.body.unshift({x: axysx, y : axysy})
        this.body.pop()
    }

    right(){
        if(this.body[0].x == screen.width - 1){
            this.Movement(0,this.body[0].y)

        } else {
            this.Movement(this.body[0].x + 1, this.body[0].y)
        }
    }

    left(){
        if(this.body[0].x == 0){
            this.Movement(screen.width - 1,this.body[0].y)

        } else {
            this.Movement(this.body[0].x - 1, this.body[0].y)
        }
    }
    
    up(){
        if(this.body[0].y == 0){
            this.Movement(this.body[0].x,screen.height - 1)
            
            
        } else {
            this.Movement(this.body[0].x,this.body[0].y - 1)
            
        }
    }

    down(){
        if (this.body[0].y == screen.height - 1) {
            this.Movement(this.body[0].x,0)
            
        } else {
            this.Movement(this.body[0].x,this.body[0].y + 1)
            
        }
    }
}

class Fruit {
    constructor(x = Math.floor(Math.random() * (screen.width - 1)),
                y = Math.floor(Math.random() * (screen.width - 1))){

        this.x = x
        this.y = y
    }

    generateFruit(){
        this.x = Math.floor(Math.random() * (screen.width - 1))
        this.y = Math.floor(Math.random() * (screen.height - 1))
    }
}

function keyboard(event) {

    let key = event.keyCode     
    
    clearInterval(interval)
    if (key == UP){
        interval = setInterval(() => {snake.up()},snakedelay)

    } else if (key == DOWN) {
       
        interval = setInterval(() => {snake.down()},snakedelay)

    } else if(key == RIGHT){
       
        interval = setInterval(() => {snake.right()},snakedelay)

    } else if (key==LEFT) {
       
        interval = setInterval(() => {snake.left()},snakedelay)

    }
}

function Render() {

    
    context.fillStyle = 'white'
    context.fillRect(0,0,screen.width,screen.height)
    
    snake.RenderSnake()

    context.fillStyle = 'red'
    context.fillRect(fruit.x,fruit.y,1,1)

    if (snake.body[0].x == fruit.x && snake.body[0].y == fruit.y){
        fruit.generateFruit()
        snake.AddPoint()
    }

    requestAnimationFrame(Render)

}

const scoreboard = new ScoreBoard()
const screen = new Screen(width,height)

const player = new Player()
const snake = new Snake()
const fruit = new Fruit()

canvas.setAttribute('width',screen.width)
canvas.setAttribute('height',screen.height)

Render()