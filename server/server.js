
var express = require("express");
var fs = require("fs");
const Fire = require("./modules/Class.Fire");
const Grass = require("./modules/Class.Grass");
const GrassEater = require("./modules/Class.GrassEater");
const LivingCreature = require("./modules/Class.LivingCreature");
const Predator = require("./modules/Class.Predator");
const Water = require("./modules/Class.Wather");
const Mard = require("./modules/Class.Mard");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../client"));
app.get("/", function (req, res) {

    res.redirect("index.html");

});

server.listen(3000, function () {

    console.log("App is running on port 3000");

});

grassArr = [];
grassEaterArr = [];
predatorArr = []
fireArr = [];
waterArr = [];
mardArr = [];

multForGrass = 8;
multForGrassEater = 6;
dieForPredator = 5;
moveForMard = 5;


io.on("connection", function (socket) {
    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass,
        multForGrassEater = data.multForGrassEater,
        dieForPredator = data.dieForPredator,
        moveForMard = moveForMard
    });
    setInterval(drawForBackend, 5000);

});
matrix = [
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 4, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 4, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 6, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 3, 4, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 4, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 0, 2, 1, 4, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 3, 0, 4, 3, 4, 4, 5, 5, 6, 6, 6, 6, 4, 4, 6, 4, 6, 4, 0, 1, 2, 0, 0, 2, 0, 3, 4, 5, 6, 3, 4, 5, 3,],
    [0, 1, 6, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 4, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 6, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 3, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 4, 0, 0, 6, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 4, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 3, 6, 0, 1, 0, 0, 1, 0, 0, 4, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 3, 0, 0, 1, 0, 3, 1, 0, 4, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 4, 0, 0, 0, 0, 1, 0, 0, 1, 4, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 6, 0, 1, 0, 0, 1, 0, 4, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 4, 0, 0, 0, 0, 1, 0, 0, 1, 0, 3, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 3, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0,],
];
var isFemale = true;
for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            isFemale = !isFemale
            var grEater = new GrassEater(x, y, 2, isFemale);
            grassEaterArr.push(grEater);

        }
        else if (matrix[y][x] == 3) {
            isFemale = !isFemale
            var predator = new Predator(x, y, 3, isFemale);
            predatorArr.push(predator);
        }
        else if (matrix[y][x] == 4) {
            var fire = new Fire(x, y, 4);
            fireArr.push(fire)

        }
        else if (matrix[y][x] == 5) {
            var water = new Water(x, y, 5);
            waterArr.push(water)

        }
        else if (matrix[y][x] == 6) {
            var mard = new Mard(x, y, 6, isFemale);
            mardArr.push(mard)

        }

    }
}
function drawForBackend() {

    for (var i in grassArr) {
        grassArr[i].mul(multForGrass);

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul(multForGrassEater);
        grassEaterArr[i].eat();
        grassEaterArr[i].move();
        grassEaterArr[i].die();

    }
    for (var i in predatorArr) {
        predatorArr[i].mult();
        predatorArr[i].eat();
        predatorArr[i].move();
        predatorArr[i].die(dieForPredator);

    }
    for (var i in mardArr) {
        mardArr[i].mult();
        mardArr[i].eat();
        mardArr[i].move(moveForMard);
        mardArr[i].die();

    }
    for (var i in fireArr) {
        fireArr[i].mul();
        fireArr[i].eat();
        fireArr[i].move();


    }
    for (var i in waterArr) {
        waterArr[i].mult();
        waterArr[i].move();
        waterArr[i].eat();


    }
    let sendData = {
        matrix: matrix
    }
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        predators: predatorArr.length,
        fires: fireArr.length,
        wathers: waterArr.length,
        mards: mardArr.length

    }
    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2))
    mystatistics = fs.readFileSync('statistics.json').toString();
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics));
    io.sockets.emit("matrix", sendData);
}
setInterval(drawForBackend, 500)
