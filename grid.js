let onColor;
let offColor;

/**
 *  Holds a grid of boxes to display on the canvas
 */
 class Grid {
    /**
     *  Initializes an n x n grid of boxes, where n is the boxesPerRow parameter
     *  @param {number} boxesPerRow The desired number of boxes per row/column of the grid 
     *  @param {number} canvasDim The width and height of the p5 canvas
     */
    constructor(boxesPerRow, canvasDim){
        // Initialize boxArray outside of the loop so we can push to it
        this.boxArray = [];

        // Set width and height
        // Right now, these are the same, but using different variables helps future-proof
        this.width = boxesPerRow;
        this.height = boxesPerRow;

        // Use a nested for loop to iterate in two dimensions
        // The outer loop moves along columns of the grid
        for(let x = 0; x < this.width; x++){
            // Again, initialize the temporary array outside the loop
            // The temporary array is a single column of the grid
            let temp = [];

            // Calculate the box dimensions from the canvas dimensions and the desired number of boxes
            let dim = canvasDim/boxesPerRow;

            /** The inner loop moves along rows
            *   Because this loop is inside the other, a 5x5 grid fills in this order:
            *   
            *       x ->
            *     y 1   6   11  16  21 
            *     | 2   7   12  17  22
            *     v 3   8   13  18  23
            *       4   8   14  19  24
            *       5   10  15  20  25
            */
            for(let y = 0; y < this.height; y++){
                /**
                 *  Push a new box to the temporary array
                 *  The x and y coordinates of the upper left corner are the box dimensions * x and y, respectively
                 *  (Thus, the first box will have a corner at (0, 0))
                 *  Then the dimensions are what we calculated before
                 *  Note that we don't include an initState, so it defaults to "water" per line 179
                 */
                temp.push(new Box(dim * x, dim * y, dim));
            }
            // Add the completed column to the array
            this.boxArray.push(temp);
        }
    }

    /**
     *  Loop through every Box in the array and call its drawBox() function
     */
    display() {
        // The Box class contains a drawBox() function to handle its own fill color, coordinates, and size
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                this.boxArray[x][y].drawBox();
            }
        }
    }

    /**
     *  Returns an array of equal dimensions to the boxArray with only the states of the respective boxes
     */
    statesArray() {
        let states = [];
        for(let x = 0; x < this.width; x++) {
            let temp = []
            for(let y = 0; y < this.height; y++) {
                temp.push(this.boxArray[x][y].currentState);
            }
            states.push(temp);
        }
        return states;
    }
}

/**
 *  A single box, for use in a Grid
 */
class Box {

    // These three colors should be inherent to boxes, as nothing else needs them

    /**
     * 
     *  @param {number} xPos The horizontal position of the box's upper left corner
     *  @param {number} yPos The vertical position of the box's upper left corner
     *  @param {number} width The box's width
     *  @param {boolean} initState The box's starting state (optional, defaults to false)
     */
    constructor(xPos, yPos, width, initState) {
        this.cornerX = xPos;
        this.cornerY = yPos;
        this.dimensions = width;
        this.currentState;
        this.fillColor;
        /** Ternary operator (?) is essentially a condensed if/else statement
        *   This allows us to provide one of two values depending on the condition
        *   Basic syntax: [condition] ? [value if true] : [value if false]
        *   
        *   In this case, if initState is undefined, we setState to false, otherwise we set it to initState
        *   This prevents currentState from being undefined even if an initState is not provided
        */
        this.setState(initState === undefined ? false : initState);
    }

    /**
     *  Draws the box using its specified coordinates, dimensions, and color
     */
    drawBox() {
        fill(this.fillColor);
        rect(this.cornerX, this.cornerY, this.dimensions, this.dimensions);
    }

    /**
     *  Uses the box's currentState to determine a fill color
     *  @returns A p5 color value
     */
    getColorFromState() {
        return this.currentState ? onColor : offColor;
    }

    /**
     *  Set the currentState value and update the fill color to match
     *  @param {boolean} newState The state to assign to currentState
     */
    setState(newState) {
        this.currentState = newState;
        this.fillColor = this.getColorFromState();
    }
}

/**
 * Checks the cells immediately adjacent to one particular cell in the given grid
 * Totals the number of neighbors with the given state (diagonal neighbors count as half)
 * 
 * @param {Array} arrayToCheck The grid to evaluate neighbors in
 * @param {number} x The x-position of the cell in question
 * @param {number} y The y-position of the cell in question
 * 
 * @returns {number} The number of matching neighbors
 */
function checkNeighbors(arrayToCheck, x, y){
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
                    yCoord = myGrid.height - 1;
                } else if(yCoord >= myGrid.height){
                    yCoord = 0;
                } else if(a === 0 && b === 0){
                } else {
                    // Check the current state of the neighboring cell
                    if(arrayToCheck[xCoord][yCoord]){
                        neighbors++;
                    }
                }
            }
        }
    }
    return neighbors;
}