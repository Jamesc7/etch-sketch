/** 
 * Gets the element with the id="container" in HTML
 * and sets it to variable container
 */
const container = document.querySelector('#container');

/**
 * This function creates the starting grid as size by size.
 * Creates the 'div' element, then adds the class='box',
 * then appends it to the container, which is the element with id="container"
 * @param {number} size The length or width of the square gridbox
 */
function startSketch(size){
    for (let i = 0; i < size; i++){
        const square = document.createElement('div');
        square.classList.add('box');
        container.appendChild(square);

    }
}

/**
 * The variable currentBox is set to the object that an event has occured on.
 * The event being 'mouseover', which is used in the setColor() function.
 * If the object has the class='box' and is not black,
 * then the element background color is changed to black.
 * @param {object} e This parameter is used through function callback
 */
function pixel(e){
    const currentBox = e.target;
    if(currentBox.className == 'box' && currentBox.style.backgroundColor != "black"){
        currentBox.style.backgroundColor = "black";
    }
}

/**
 * Same thing is pixel(e) except using random colors through random_rgba()
 * @param {object} e This parameter is used through function callback
 */
function pixelColored(e){
    const currentBox = e.target;
    if(currentBox.className == 'box'){
        currentBox.style.backgroundColor = random_rgba();
    }
}

//Random colors
//Color is set to rgba(red,green,blue,alpha)
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

/**
 * Adds functionality to the Clear Grid button at the top of the screen.
 * Deletes all the instantiated boxes we made at the start,
 * Prompts user to enter a number and checks if it's a only a number,
 * Then re-styles the CSS according to the number and creates the boxes.
 */
function clr(){
    //Resets colored boxes
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++){
        container.removeChild(boxes[i]);
    }

    //Asks for number of sqaures
    do{
        var answer = parseInt(prompt("How many squares per side do you want the grid to be?"),10);
    }while(isNaN(answer));

    //Creates screen
    container.style.gridTemplateColumns = `repeat(${answer}, auto)`;
    container.style.gridTemplateRows    = `repeat(${answer}, auto)`;
    //Size is squared by 2 cause getting sides 
    startSketch(answer**2);
}

/**
 * In the HTML file, the button with the id="setColor" 
 * is set to use this function upon being clicked. 
 * It swaps colors by flipping a bool value to use either
 * the functions pixel() or pixelColored().
 * 
 * Here the window, which is the browser, looks for the 
 * event 'mouseover' on any objects and when the user
 * mouses over anything it will use the function pixel or pixelColored().
 */
function setColor(){
    if(colorOn){
        window.addEventListener('mouseover', pixel);
    } else {
        window.removeEventListener('mouseover', pixel);
        window.addEventListener('mouseover', pixelColored);
    }
    colorOn = !colorOn;
}

/**
 * Gets the element with id="clear" and sets it to variable clearScreen
 * Instead of having the onclick attribute on the HTML file,
 * you are also able to set it here in JS. 
 * Pressing the clear button runs the clr() function
 */
const clearScreen = document.querySelector('#clear');
clearScreen.setAttribute('onClick', 'clr(this.id)');

//Starts screen 16by16
startSketch(256);
//Sets color for hovering
//Default is black
let colorOn = true;
setColor();