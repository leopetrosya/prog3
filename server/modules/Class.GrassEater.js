let random = require("./random");
const LivingCreature = require("./Class.LivingCreature");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 8;
        this.isFemale = isFemale
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }
    mul() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 8) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newEaterGrass = new GrassEater(newX, newY, 2,)
            grassEaterArr.push(newEaterGrass)
        }
        if(this.isFemale){
            this.energy = 5;
        }else{
            this.energy = 10;
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = food[0]
            this.y = food[1]

        }
        if(this.isFemale){
            this.energy--;
        }else{
            this.energy-= 2;
        }
        
    }
    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = food[0]
            this.y = food[1]
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2
        }
    }

    die() {
        if (this.energy <= 0 ) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }
    }





    ///
    
}