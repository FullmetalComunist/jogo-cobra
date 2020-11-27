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
let placar = document.querySelector('p#placar')


class Screen {
    constructor(height=10,width=10){
        this.height = height
        this.width = width
    }
}

class Snake {
    constructor(){
        this.points = 0
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
        this.points++
        console.log(this.points)
        placar.innerHTML = this.points
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

    context.fillStyle = 'yellow'
    context.fillRect(fruit.x,fruit.y,1,1)

    if (snake.body[0].x == fruit.x && snake.body[0].y == fruit.y){
        fruit.generateFruit()
        snake.AddPoint()
    }

    requestAnimationFrame(Render)

}

const snake = new Snake()
const screen = new Screen(width,height)
const fruit = new Fruit()

canvas.setAttribute('width',screen.width)
canvas.setAttribute('height',screen.height)

Render()