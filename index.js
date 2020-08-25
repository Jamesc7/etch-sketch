const container = document.querySelector('#container');

function startSketch(size){
    for (let i = 0; i < size; i++){
        const square = document.createElement('div');
        square.classList.add('box');
        container.appendChild(square);

    }
}

function pixel(e){
    const currentBox = e.target;
    if(currentBox.className == 'box' && currentBox.style.backgroundColor != "black"){
        currentBox.style.backgroundColor = "black";
    }
}

function pixelColored(e){
    const currentBox = e.target;
    if(currentBox.className == 'box'){
        currentBox.style.backgroundColor = random_rgba();
    }
}



//Random colors
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


function clr(id){
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

function setColor(){
    if(colorOn){
        window.addEventListener('mouseover', pixel);
    } else {
        window.removeEventListener('mouseover', pixel);
        window.addEventListener('mouseover', pixelColored);
    }
    colorOn = !colorOn;
}

//Checks for clear button
const clearScreen = document.querySelector('#clear');
clearScreen.setAttribute('onClick', 'clr(this.id)');

//Starts screen 16by16
startSketch(256);
//Sets color for hovering
let colorOn = true;
setColor();
