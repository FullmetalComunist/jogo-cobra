const LEFT = 37
const RIGHT = 39
const UP = 38
const DOWN = 40

const snakespeed = 50
const height = 20
const width = 20

let interval
let running = true

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

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

        this.points++
        this.body.push(SnakePart)
    }

    right(){
        if(this.body[0].x == screen.width - 1){
            this.body.unshift({x: 0, y : this.body[0].y})
            this.body.pop()

        } else {
            this.body.unshift({x: this.body[0].x + 1,
                                    y:this.body[0].y})
            this.body.pop()
        }
    }

    left(){
        if(this.body[0].x == 0){
            this.body.unshift({x: screen.width - 1, y : this.body[0].y})
            this.body.pop()

        } else {
            this.body.unshift({x: this.body[0].x - 1,
                y:this.body[0].y})
            this.body.pop()
        }
    }
    
    up(){
        if(this.body[0].y == 0){
            this.body.unshift({x: this.body[0].x, y : screen.height - 1})
            this.body.pop()
            
        } else {
            this.body.unshift({x: this.body[0].x, y : this.body[0].y - 1})
            this.body.pop()
        }
    }

    down(){
        if (this.body[0].y == screen.height - 1) {
            this.body.unshift({x: this.body[0].x, y : 0})
            this.body.pop()
        } else {
            this.body.unshift({x: this.body[0].x, y : this.body[0].y + 1})
            this.body.pop()
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
        interval = setInterval(() => {snake.up()},snakespeed)

    } else if (key == DOWN) {
       
        interval = setInterval(() => {snake.down()},snakespeed)

    } else if(key == RIGHT){
       
        interval = setInterval(() => {snake.right()},snakespeed)

    } else if (key==LEFT) {
       
        interval = setInterval(() => {snake.left()},snakespeed)

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

    for (let i in snake.body){
        let part = snake.body[i]
        if (snake.body[0].x === part.x && snake.body[0].y === part.y && snake.body.length > 2){
            //console.log(snake.body.length)
            //let ok = prompt('Você Perdeu!')
            //document.location.reload
        }

    }

    requestAnimationFrame(Render)

}

const snake = new Snake()
const screen = new Screen(width,height)
const fruit = new Fruit()

canvas.setAttribute('width',screen.width)
canvas.setAttribute('height',screen.height)



if (!running){
    
}

Render()