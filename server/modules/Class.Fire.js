let random = require("./random");
const LivingCreature = require("./Class.LivingCreature");

module.exports = class Fire extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
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
    move() {
        var empty = random(this.chooseCell(0))
        if (empty) {
            matrix[this.y][this.x] = 0
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            this.x = empty[0]
            this.y = empty[1]
        }
    }
    chooseCell(char1, char2, char3) {
        this.getNewCoordinates();
        return super.chooseCell(char1, char2, char3);
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newFire = new Fire(newX, newY, 4);
            fireArr.push(newFire);
            this.multiply = 0;
        }
    }
    eat() {
        var food = random(this.chooseCell(1, 2, 3))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]

            this.x = newX
            this.y = newY
            if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            }
            else if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1)

                    }

                }
            }
            else if (matrix[newY][newX] == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1)

                    }

                }
            }
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }
}