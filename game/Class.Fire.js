class Fire extends LivingCreature {
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
    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }
}