function createSticky() {
    // create 
    let textBox = createBox();
    let textarea = document.createElement("textarea");
    textBox.appendChild(textarea);
    textBox.style.display = "block";
}