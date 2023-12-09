if (!window.matchMedia(
    '(pointer: none), (pointer: coarse), (pointer: fine)').matches 
    || !(window.ontouchstart 
    && window.onpointerdown)) {
    
        //document.getElementById("alert").style.visibility = "visible";
}
console.log(window.ontouchstart)
console.log(window.onpointerdown)