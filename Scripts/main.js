// Verify if the navigator and device handle touch
if ('ontouchstart' in window) {
        document.getElementById("alert").remove();
}

var last_dot_clicked = undefined

// Make the choice simulation start
function setUpChoiceInterface(){
    document.getElementById("main-block").remove();

    let text = document.createElement("p");
    text.textContent = "Placez vos doigts sur l'écran";
    document.body.appendChild(text);

    let newZone = document.createElement("div");
    newZone.classList.add("zone");
    document.body.appendChild(newZone);
    newZone.ontouchstart = zoneListener;
}

function zoneListener(e){
    navigator.vibrate(100);

    transformToDot(e, this);
    createNewElement(e);

    waitForResults(this);
}

// Transform the current zone to a point
function transformToDot(e, zoneToTransform){
    zoneToTransform.classList.remove("zone");
    zoneToTransform.classList.add("dot");
    zoneToTransform.style.left = `calc(${e.targetTouches[0].clientX}px - 10vh)`;
    zoneToTransform.style.top = `calc(${e.targetTouches[0].clientY}px - 10vh)`;
  
    // With a random color
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    zoneToTransform.style.backgroundColor = "#" + randomColor;

    last_dot_clicked = zoneToTransform;
    startDrag(e, zoneToTransform);
}

// Create a new touchable zone
function createNewElement(e){
    var newZone = document.createElement("div");
    newZone.classList.add("zone");
    document.body.appendChild(newZone);
    newZone.ontouchstart = zoneListener;
}

// Handle dots movments
function startDrag(e, element) {
    element.ontouchmove = moveDrag;
  
    element.ontouchend = function () {
      element.remove();
    }
  
    var pos = [element.offsetLeft, element.offsetTop];
    var origin = getCoors(e);
  
    function moveDrag(e) {
        var currentPos = getCoors(e);
        var deltaX = currentPos[0] - origin[0];
        var deltaY = currentPos[1] - origin[1];
        element.style.left = (pos[0] + deltaX) + 'px';
        element.style.top = (pos[1] + deltaY) + 'px';
        return false; // cancels scrolling
    }
  
    function getCoors(e) {
        var coors = [];
        if (e.targetTouches && e.targetTouches.length) {
            var thisTouch = e.targetTouches[0];
            coors[0] = thisTouch.clientX;
            coors[1] = thisTouch.clientY;
        } else {
            coors[0] = e.clientX;
            coors[1] = e.clientY;
        }
        return coors;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForResults(element) {
    for (let i = 0; i < 3; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    declareWinner(element);
    console.log('Done');
}

// Chose and show which color won
function declareWinner(element){
    if(element != last_dot_clicked)
        return;

    let dots = document.getElementsByClassName("dot");
    if (dots.length >= 1) { 
        let winningDotNumber = Math.floor(Math.random() * dots.length);
        let winningDot = dots[winningDotNumber];
        navigator.vibrate(300);
        let color = winningDot.style.backgroundColor;
        document.body.style.backgroundColor = color;
    }
    while(dots.length > 0){
        dots[0].remove();
    }
}

var startButton = document.getElementById("startButton");
startButton.onclick = setUpChoiceInterface;

document.ongesturechange = function () {
    return false;
}