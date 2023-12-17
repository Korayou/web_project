// Verify if the navigator and device handle touch
if ('ontouchstart' in window) {
        document.getElementById("alert").remove();
}

// Make the choice simulation start
function setUpChoiceInterface(){
    document.getElementById("main-block").remove();

    let text = document.createElement("p");
    text.textContent = "Placez vos doigts sur l'écran";
    document.body.appendChild(text);

    let newZone = document.createElement("div");
    newZone.classList.add("zone");
    document.body.appendChild(newZone);
    newZone.ontouchstart = createNewElement;
}

// Create a new touchable zone
function createNewElement(e){
    navigator.vibrate(100);
  
    // Create a new zone where we can create a new point
    var newZone = document.createElement("div");
    newZone.classList.add("zone");
    document.body.appendChild(newZone);
    newZone.ontouchstart = createNewElement;
  
    // Transform the actual zone to a point
    this.classList.remove("zone");
    this.classList.add("dot");
    this.style.left = e.targetTouches[0].clientX + 'px';
    this.style.top = e.targetTouches[0].clientY + 'px';
  
    // With a random color
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.style.backgroundColor = "#" + randomColor;
    
    // Start to wait for results
    waitForResults();

    startDrag(e, this);
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

async function waitForResults() {
    for (let i = 0; i < 3; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    declareWinner();
    console.log('Done');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Chose and show which color won
function declareWinner(){
    let dots = document.getElementsByClassName("dot");
    console.log(dots.length)
    if (dots.length >= 1) { 
        let winningDotNumber = Math.floor(Math.random() * dots.length);
        let winningDot = dots[winningDotNumber];
        navigator.vibrate(300);
        let color = winningDot.style.backgroundColor;
        document.body.style.backgroundColor = color;
        for (let dot of dots){
            dot.remove();
        }
    }
}

var startButton = document.getElementById("startButton");
startButton.onclick = setUpChoiceInterface;

document.ongesturechange = function () {
    return false;
}