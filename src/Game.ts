import { Snake, Snakepart, SnakeDirections } from "./Snake";

export class Game {

    canvasContext : CanvasRenderingContext2D;
    gridWidth : number;
    gridHeight : number;
    snake : Snake;
    gameOver : boolean = false;

    constructor(public canvas : HTMLCanvasElement, public speed : number, public gridSize : number = 8) {
        this.gridWidth = canvas.width / gridSize;
        this.gridHeight = canvas.height / gridSize;
        this.canvasContext = canvas.getContext("2d");
        document.addEventListener("keydown", this.buttonInput.bind(this));
        // TODO : listen to user interaction
    }

    /**
     * Start game
     */
    start() {
        // TODO : initialize game
        
        this.canvasContext.fillStyle = '#F0F0F0'; // set canvas' background color
        this.canvasContext.fillRect(0, 0, this.gridWidth*this.gridSize, this.gridHeight*this.gridSize);  // now fill the canvas
        this.draw();

        this.animate(); // Start animation
    }

    animate() {
        let fps = this.speed;
        let now;
        let then = Date.now();
        let interval = 1000/fps;
        let delta;

        let animationLoop = (function () {
            if (!this.isGameOver) {
                requestAnimationFrame(animationLoop);
            }

            now = Date.now();
            delta = now - then;

            if (delta > interval) {
                then = now - (delta % interval);
                this.update();
            }

        }).bind(this);

        animationLoop();
    }

    /**
     * Update status of game and view
     */
    update() {
        // TODO
        console.log("update")
        for(let i : number = 1; i < this.snake.tabSnakePart.length;i++){
            if(this.snake.head().posX == this.snake.tabSnakePart[i].posX){
                if(this.snake.head().posY == this.snake.tabSnakePart[i].posY){
                    this.gameOver = true;
                }
            }
        }
        if( this.snake.head().posX < 0
         || this.snake.head().posX > this.gridWidth-1
         || this.snake.head().posY < 0 
         || this.snake.head().posY > this.gridHeight-1){
            this.gameOver = true;
        }

        if(!this.gameOver){
            this.snake.move();
            this.canvasContext.clearRect(0,0, this.gridSize*this.gridWidth,this.gridSize*this.gridHeight);
            this.canvasContext.fillStyle = '#F0F0F0'; // set canvas' background color
            this.canvasContext.fillRect(0, 0, this.gridWidth*this.gridSize, this.gridHeight*this.gridSize);  // now fill the canvas
            this.snake.draw(this.canvasContext,this.gridSize);
        }
    }

    draw(){
        this.snake = new Snake(15, this.gridWidth/2,this.gridHeight/2);
        this.snake.draw(this.canvasContext,this.gridSize);
    }

    buttonInput(evt){
        if(evt.keyCode){
            
            switch(evt.keyCode){
                case SnakeDirections.enter :
                    if(this.gameOver){
                        this.gameOver = false;
                        this.draw();
                    }
                    break;

                case SnakeDirections.up :
                    console.log("up");
                    if(this.snake.direction != SnakeDirections.down && this.snake.direction != 0){
                        this.snake.direction = SnakeDirections.up;

                    }
                    break;
                case SnakeDirections.down :
                    if(this.snake.direction != SnakeDirections.up){
                        this.snake.direction = SnakeDirections.down;
                    }
                    console.log("down");
                    break;
                case SnakeDirections.left :
                    if(this.snake.direction != SnakeDirections.right){
                        this.snake.direction = SnakeDirections.left;

                    }
                    console.log("left");
                    break;
                case SnakeDirections.right :
                    if(this.snake.direction != SnakeDirections.left){
                        this.snake.direction = SnakeDirections.right;

                    }
                    console.log("right");
                    break;
            }
        }
    }
}
