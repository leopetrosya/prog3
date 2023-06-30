let random = require("./random");
const LivingCreature = require("./Class.LivingCreature");
module.exports = class Mard extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 10;
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
    chooseCell(char1, char2) {
        this.getNewCoordinates();
        return super.chooseCell(char1, char2);
    }
    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 6
            var newMard = new Mard(newX, newY, 6)
            mardArr.push(newMard)
            if(this.isFemale){
                this.energy=5
            }
            else{
                this.energy=8
            }
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 6
            this.x = food[0]
            this.y = food[1]

        }
        this.energy--;
    }
    eat() {
        var food = random(this.chooseCell(2, 3))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            } else {
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[newY][newX] = 6
            this.x = food[0]
            this.y = food[1]
            this.energy += 5
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in mardArr) {
                if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                    mardArr.splice(i, 1)
                    break
                }
            }
        }
    }
}