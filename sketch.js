// Use a variable to define our canvas width and height
// This makes it easier to adjust and reference dimensions in code
let canvasDimensions = 500;
// The number of boxes in each row/column
let boxes = 50;
// A reference to the main canvas
let canvas;
// A Grid we'll initialize in setup()
let myGrid;

let generations = 1;
let timer = 0;
let paused = false;

function setup(){
    // These colors are declared in grid.js and initialized here
    onColor = color(0, 200, 200);
    offColor = color(51, 30, 0);

    // Standard p5 setup
    canvas = createCanvas(canvasDimensions, canvasDimensions);
    background(0);
    noStroke();

    myGrid = new Grid(boxes, canvasDimensions);
    randomizeStart(0.09);
    textSize(20);
}

function draw(){
    myGrid.display();
    fill(255);
    text(`Generation ${generations}`, 10, 25);
    if(timer % 10 === 0 && !paused) {
        generations++;
        stepForward();
    }
    timer++;
}

function keyReleased() {
    if(keyCode === 32) {
        generations++;
    }
    if(keyCode === 80) {
        paused = !paused;
    }
}

function randomizeStart(activeRate) {
    for(let x = 0; x < myGrid.width; x++){
        for(let y = 0; y < myGrid.height; y++) {
            if(Math.random() < activeRate) {
                myGrid.boxArray[x][y].setState(true);
            }
        }
    }    
}

function stepForward() {
    startingGrid = myGrid;
    for(let x = 0; x < myGrid.width; x++){
        for(let y = 0; y < myGrid.height; y++) {
            let currentBox = myGrid.boxArray[x][y];
            let neighbors = checkNeighbors(x, y, true);
            if(currentBox.currentState) {
                if(neighbors < 2 || neighbors > 3) {
                    currentBox.setState(false);
                }
            } else {
                if(neighbors === 3) {
                    currentBox.setState(true);
                }
            }
        }
    }
}

function checkNeighbors(x, y, checkState){
    let neighbors = 0;
    // Loop through the three columns centered on our cell
    for(let a = -1; a < 2; a++){
        let xCoord = x + a;
        // Wrap around to the opposite side of the grid
        if(xCoord < 0){
            xCoord = myGrid.width - 1;
        } else if(xCoord >= myGrid.width){
            xCoord = 0;
        } else {
            // Loop through the three rows centered on our cell
            for(let b = -1; b < 2; b++){
                let yCoord = y + b;
                if(yCoord < 0) {
                    yCoord = myGrid.height;
                } else if(yCoord >= myGrid.height){
                    yCoord = 0;
                } else if(a === 0 && b === 0){
                } else {
                    // Check the current state of the neighboring cell
                    if(myGrid.boxArray[xCoord][yCoord].currentState === checkState){
                        neighbors++;
                    }
                }
            }
        }
    }
    return neighbors;
}