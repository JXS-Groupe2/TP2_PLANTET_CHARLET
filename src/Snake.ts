
export class Snake{
    tabSnakePart : Snakepart[];
    direction : number = 0;

    constructor(nbParts : number,posX : number, posY : number){
        this.tabSnakePart= new Array<Snakepart>(nbParts);
        for(let i : number = 0;i<nbParts;i++){
            this.tabSnakePart[i] = new Snakepart(posX,posY-i);
        }

    }

    draw(ctx : CanvasRenderingContext2D, size : number){
        for (let part of this.tabSnakePart){
            part.draw(ctx,size);
        }
    }

    head() : Snakepart{
        return this.tabSnakePart[0];
    }
    
    tail() : Snakepart[]{
        /*let result : Snakepart[] = new Array<Snakepart>(this.TabSnakePart.length);
        for(let i : number =0;i<this.TabSnakePart.length -1;i++){
            result[i] = this.TabSnakePart[i+1];
        }*/

        return this.tabSnakePart.slice(1);
    }

    move(){
        if (this.direction !=0){
            let nextPosX = this.head().posX;
            let nextPosY = this.head().posY;
            switch(this.direction){
                case SnakeDirections.up :
                    nextPosY--;
                    break;
                case SnakeDirections.down :
                    nextPosY++
                    break;
                case SnakeDirections.left :
                    nextPosX--;
                    break;
                case SnakeDirections.right :
                    nextPosX++;
                    break;
            }
            let result : Snakepart[] = this.tabSnakePart.slice(0,this.tabSnakePart.length-1)
            let newSnakePart = new Snakepart(nextPosX, nextPosY)
            result.unshift(newSnakePart);
            this.tabSnakePart = result;
            
        }
    }
}



export class Snakepart{ 

    constructor( public posX : number,public posY : number){

    }
    draw(ctx : CanvasRenderingContext2D, size : number){
        ctx.beginPath();
        //ctx.rect(this.posX*size,this.posY*size, size, size);
        ctx.fillStyle = "#b73e0d";
        ctx.fillRect(this.posX*size, this.posY*size, size, size);
        
        ctx.stroke();

    }
    
}

export enum SnakeDirections{
    up = 38,
    down = 40,
    left = 37,
    right =39,
    enter = 13,
}