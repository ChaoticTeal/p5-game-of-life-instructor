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

function setup(){
    // These three colors are declared in grid.js and initialized here
    onColor = color(0, 200, 200);
    offColor = color(51, 30, 0);

    // Standard p5 setup
    canvas = createCanvas(canvasDimensions, canvasDimensions);
    background(0);
    noStroke();

    /**
     *  @NOTE The initializeGrid() function, along with the functions it calls,
     *  are all defined in islands.js. We'll put our new work in here!
     */
    myGrid = new Grid(boxes, canvasDimensions);
    textSize(20);
}

function draw(){
    myGrid.display();
    fill(255);
    text(`Generation ${generations}`, 10, 25);
}

function keyReleased() {
    if(keyCode === 32) {
        generations++;
    }
}