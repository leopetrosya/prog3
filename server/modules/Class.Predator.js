
let random = require("./random");
const LivingCreature = require("./Class.LivingCreature");

module.exports = class Predator extends LivingCreature{
    constructor(x, y, index,isFemale) {
        super(x, y, index)
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
    move() {
        var empty = random(this.chooseCell(0))
        if (empty) {
            matrix[this.y][this.x] = 0
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            this.x = empty[0]
            this.y = empty[1]
        }
        this.energy--;
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
        }

    }
    mult() {
        this.multiply++;
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > 7) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var newPredator = new Predator(newX, newY, 3);
            predatorArr.push(newPredator);
            this.energy = 8;
        }
    }
    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }
            if(this.isFemale){
                this.energy += 2
            }else{
                this.energy += 5
            }

        }
    }
}





// chkaaaaa