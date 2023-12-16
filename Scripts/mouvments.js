// Handle dots movments
function startDrag(e, element) {
  console.log("Start Drag");
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
    console.log("Déplacement appliqué");
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

function createNewElement(e){
  navigator.vibrate(200);

  // Create a new zone where we can create a new point
  var newZone = document.createElement("div");
  newZone.classList.add("zone");
  document.body.appendChild(newZone);
  newZone.ontouchstart = createNewElement;

  // Transform the zone to a point
  this.classList.remove("zone");
  this.classList.add("dot");
  this.style.left = e.targetTouches[0].clientX + 'px';
  this.style.top = e.targetTouches[0].clientY + 'px';

  // With a random color
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  this.style.backgroundColor = "#" + randomColor;
  
  // Remember when the last contact was made
  var lastInteractionTime = Date.now();
  startDrag(e, this);
}

// Wait for every dots to be the same for a long enough time
const winning = new Promise((resolve) => {
  while (true){
    if (Date.now() - lastInteractionTime >= 3000){
      resolve()
    }
  }
})

// Select the winning dot
winning.then(() => {
  let dots = document.getElementsByClassName("dot");
  let winningDotNumber = getRandomInt(dots.length);
  var winningDot = dots[winningDotNumber];
  declareWinner(winningDot);
})


// Show which color won
function declareWinner(dot){
  navigator.vibrate(400);
  color = dot.style.color;
  body.style.color = color;
}

var zones = document.getElementsByClassName("zone");
zones[0].ontouchstart = createNewElement;

document.ongesturechange = function () {
  return false;
}
