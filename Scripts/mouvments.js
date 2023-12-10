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
  // Create a new zone where we can create a new point
  var newZone = document.createElement("div");
  newZone.classList.add("zone");
  document.body.appendChild(newZone);
  newZone.ontouchstart = createNewElement;

  // Transform the zone to a point
  this.classList.remove("zone");
  this.classList.add("element");
  this.style.backgroundColor = "#000000"
  this.style.left = e.targetTouches[0].clientX + 'px';
  this.style.top = e.targetTouches[0].clientY + 'px';
  
  startDrag(e, this);
  console.log("nouvel element");
}

var zone = document.getElementsByClassName("zone");
zone[0].ontouchstart = createNewElement;


document.ongesturechange = function () {
  return false;
}

