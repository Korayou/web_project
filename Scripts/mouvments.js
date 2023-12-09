function startDrag(e) {
  console.log("Start Drag");
  this.ontouchmove = moveDrag;

  this.ontouchend = function () {
    this.ontouchmove = null;
    this.ontouchend = null;
  }

  var pos = [this.offsetLeft, this.offsetTop];
  console.log("Pos : "+pos);
  var origin = getCoors(e);
  console.log("Origin : "+origin);

  function moveDrag(e) {
    console.log("Move Drag !")
    var currentPos = getCoors(e);
    console.log("Current pos : "+currentPos);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    this.style.left = (pos[0] + deltaX) + 'px';
    this.style.top = (pos[1] + deltaY) + 'px';
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

var bubbles = document.getElementsByClassName("element");
for (let bubble of bubbles){
  bubble.ontouchstart = startDrag;
}

document.ongesturechange = function () {
  return false;
}

