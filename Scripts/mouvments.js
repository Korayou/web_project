function startDrag(e, element, zone) {
  console.log("Start Drag");
  zone.ontouchmove = moveDrag;

  zone.ontouchend = function () {
    element.ontouchmove = null;
    element.ontouchend = null;
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
  var newElement = document.createElement("div");
  newElement.classList.add("element");
  newElement.style.left = e.targetTouches[0].clientX + 'px';
  newElement.style.top = e.targetTouches[0].clientY + 'px';
  this.appendChild(newElement);
  startDrag(e, newElement, this);
  console.log("nouvel element");
}

var zone = document.getElementsByClassName("zone");
zone[0].ontouchstart = createNewElement;


document.ongesturechange = function () {
  return false;
}

