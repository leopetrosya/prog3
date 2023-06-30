socket = io();
var side = 20, m = 40, n = 40;
multForGrass = 8;
multForGrassEater = 6;
dieForPredator = 5;
moveForMard = 5;

alert("click on image and turn on the sound")

var grassColor = "#09DE17"
function setup() {
    frameRate(40);
    createCanvas(n * side, m * side);
    background('#e8e8e8');
    button1 = document.getElementById("amar");
    button2 = document.getElementById("dzmer");

    button1.addEventListener("click", onColorChange)
    button2.addEventListener("click", onColorChange)
    const btn = document.querySelector("button");
    const box = document.querySelector("div");
    const video = document.querySelector("video");

    btn.addEventListener("click", () => box.classList.remove("hidden"));
    video.addEventListener("click", () => video.play());
    video.addEventListener("click", () => audio.play());
    box.addEventListener("click", () => box.classList.add("hidden"));


}
function onColorChange() {
    if (event.target.id == "amar") {
        grassColor = "#12D804"
        multForGrass = 6;
        multForGrassEater = 8;
        dieForPredator = 7;
        moveForMard = 8;
    }
    else if (event.target.id == "dzmer") {
        grassColor = "#CCFFE5"
        multForGrass = 10;
        multForGrassEater = 4;
        dieForPredator = 3;
        moveForMard = 2;


    }
    let data = {
        multForGrass: multForGrass,
        multForGrassEater: multForGrassEater,
        dieForPredator: dieForPredator,
        moveForMard: moveForMard
    }
    socket.on("matrix", drawMatrix)
    socket.emit("afterClick", data)


}

function drawMatrix(data) {
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#FAE293");
                rect(x * side, y * side, side, side);
            }

        }

    }
}
socket.on("matrix", drawMatrix);








































// var matrix = [
//     [3, 0, 2, 1, 0, 1, 5, 2, 1, 0, 2, 1, 0, 0, 0, 0, 0, 3, 0, 3, 0],
//     [0, 0, 3, 2, 2, 0, 0, 0, 2, 5, 0, 1, 0, 0, 0, 2, 2, 5, 0, 1, 0],
//     [0, 0, 4, 0, 1, 1, 3, 1, 0, 1, 1, 0, 0, 1, 0, 0, 5, 1, 2, 4, 0],
//     [0, 3, 1, 2, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 2, 1, 0, 0, 2, 0, 0, 1, 0, 2, 0],
//     [0, 1, 0, 5, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0],
//     [0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0],
//     [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 2, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0],
//     [0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 3, 3, 0, 3, 0, 3, 0, 0],
//     [0, 2, 0, 4, 3, 1, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 0, 2, 4, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
//     [0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//     [0, 0, 0, 3, 0, 1, 5, 0, 2, 5, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 2],
//     [2, 0, 1, 3, 0, 1, 0, 2, 0, 3, 3, 1, 0, 0, 5, 0, 2, 0, 1, 0, 0],
//     [0, 2, 0, 0, 0, 1, 3, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
//     [0, 0, 1, 4, 5, 1, 0, 0, 0, 2, 0, 1, 0, 3, 0, 0, 1, 3, 0, 4, 0],
//     [0, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 2, 0, 0, 0, 2, 5, 1, 2, 0],
//     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
// ];

// var side = 150;
// var grassArr = [];
// var grassEaterArr = [];
// var predatorArr = []
// var fireArr = [];
// var waterArr = [];


// function setup() {
//     frameRate(5);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {
//             if (matrix[y][x] == 1) {
//                 var gr = new Grass(x, y, 1);
//                 grassArr.push(gr);
//             }
//             else if (matrix[y][x] == 2) {
//                 var grEater = new GrassEater(x, y, 2);
//                 grassEaterArr.push(grEater);

//             }
//             else if (matrix[y][x] == 3) {
//                 var predator = new Predator(x, y, 3);
//                 predatorArr.push(predator);
//             }
//             else if (matrix[y][x] == 4) {
//                 var fire = new Fire(x, y, 4);
//                 fireArr.push(fire)

//             }
//             else if (matrix[y][x] == 5) {
//                 var water = new Water(x, y, 5);
//                 waterArr.push(water)

//             }
//         }
//     }
// }




// function draw() {

//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("orange");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("blue");
//                 rect(x * side, y * side, side, side);
//             }

//         }

//     }
//     for (var i in grassArr) {
//         grassArr[i].mul();

//     }
//     for (var i in grassEaterArr) {
//         grassEaterArr[i].mul();
//         grassEaterArr[i].eat();
//         grassEaterArr[i].move();
//         grassEaterArr[i].die();

//     }
//     for (var i in predatorArr) {
//         predatorArr[i].mult();
//         predatorArr[i].eat();
//         predatorArr[i].move();
//         predatorArr[i].die();

//     }
//     for (var i in fireArr) {
//         // fireArr[i].mult();
//         fireArr[i].eat();
//         fireArr[i].move();


//     }
//     for (var i in waterArr) {
//         // waterArr[i].mult();
//         waterArr[i].move();
//         waterArr[i].eat();


//     }





// }