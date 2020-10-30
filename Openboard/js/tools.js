var $ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui');

ctx.lineWidth = 5;
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = 'round';
let activeTool = 'pencil';
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let sticky = document.querySelector("#sticky");
const tools = document.querySelectorAll(".tool");
console.log(tools);
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let toggleP = false;
let toggleE = false;


let idx = 0;
function handleTool(tool) {
    if (tool == "pencil") {
        ctx.strokeStyle = "black";

        if (activeTool == "pencil" && toggleP == true) {
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            toggleP = false;
            pencilOptions.classList.remove("show");
        } else {
            activeTool = "pencil";
            toggleP = true;

            tools[idx].classList.remove("active");
            idx = 0;
            tools[idx].classList.add("active");

            pencilOptions.classList.add("show");
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {
        ctx.strokeStyle = "white"

        if (activeTool == "eraser" && toggleE == false) {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            toggleE = true;
            eraserOptions.classList.remove("show");
        } else {
            activeTool = "eraser";
            toggleE = false;

            tools[idx].classList.remove("active");
            idx = 1;
            tools[idx].classList.add("active");

            eraserOptions.classList.add("show");
            pencilOptions.classList.remove("show");
        }
    } else if (tool == "sticky") {
        tools[idx].classList.remove("active");
        idx = 2;
        tools[idx].classList.add("active");
        createSticky();
    } else if (tool == "upload") {
        tools[idx].classList.remove("active");
        idx = 3;
        tools[idx].classList.add("active");
        uploadFile();
    } else if (tool == "undo") {
        tools[idx].classList.remove("active");
        idx = 4;
        tools[idx].classList.add("active");
        undoLast();
    } else if (tool == "redo") {
        tools[idx].classList.remove("active");
        idx = 5;
        tools[idx].classList.add("active");
        redoLast();
    } else if (tool == "download") {
        tools[idx].classList.remove("active");
        idx = 6;
        tools[idx].classList.add("active");
        downloadBoard();
    } else if (tool == "delete") {
        tools[idx].classList.remove("active");
        idx = 7;
        tools[idx].classList.add("active");
        let stickyPad = document.querySelectorAll(".stickyPad");
        stickyPad.forEach(function (sticky) {
            sticky.remove();
        })
        ctx.clearRect(0, 0, board.width, board.height);
        pencilOptions.classList.remove("show");
        eraserOptions.classList.remove("show");
        undoArr.length = 0;
        redoArr.length = 0;
    } else if(tool == "switch") {
        tools[idx].classList.remove("active");
        idx = 8;
        tools[idx].classList.add("active");

        $(".overlay").css("display", "none");
        $(".stickyPad").css("display", "hidden");
    }
}

function changeColor(color) {
    ctx.strokeStyle = color;
}

let sliders = document.querySelectorAll("input[type='range']");
for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("change", function () {
        let width = sliders[i].value;
        ctx.lineWidth = width;
    })
}

const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
    handleHamburger();
})

let isActive = true;
function handleHamburger() {
    if (isActive == true) {
        hamburger.classList.remove("is-active");
        toolPanel.classList.remove("add-animation");
    } else {
        hamburger.classList.add("is-active");
        toolPanel.classList.add("add-animation");
    }

    isActive = !isActive;
}