// Use a variable to define our canvas width and height
// This makes it easier to adjust and reference dimensions in code
let canvasDimensions = 500;
// The number of boxes in each row/column
let boxes = 100;
// A reference to the main canvas
let canvas;
// A Grid we'll initialize in setup()
let myGrid;

let generations = 1;
let timer = 0;
let paused = false;

function setup(){
    // These colors are declared in grid.js and initialized here--feel free to use different colors!
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
    startingGrid = myGrid.statesArray();
    for(let x = 0; x < myGrid.width; x++){
        for(let y = 0; y < myGrid.height; y++) {
            let currentBox = myGrid.boxArray[x][y];
            let neighbors = checkNeighbors(startingGrid, x, y);
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