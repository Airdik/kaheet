// VIEWs
function viewModes() {
    clearMainDiv();
    displayMessage("Choose a mode any mode!")
    addModes();
}
function viewInfo() {
    displayMessage("Thanks for using Kheet!");
    clearMainDiv();
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.style.overflowX = "hidden";
    mainDiv.style.overflowY = "scroll";
    mainDiv.innerHTML =
        'Kaheet is a free kahoot cheat originally by <a href="https://github.com/pxtrez" target="_blank">pxtrez</a> Modified by <a href="https://github.com/EShrestha" target="_blank">EShrestha</a> and <a href="https://github.com/Ratel8989" target="_blank">Ratel</a>'
    addSecondaryButton("👈", askForPin);
}
function viewAllQnA() {
    displayMessage("All of the answers are below.")
    clearMainDiv();
    let mainDiv = document.getElementById("mainDiv");

    addSecondaryButton("👈", viewModes);




    mainDiv.style.overflowY = "auto";
    // parse json DATA
    for (let i = 0; i < json.length; i++) {
        let Q = json[i]["question"].substring(0, 28);
        let A = json[i]["answers"];
        let qnaText = document.createElement("p");
        qnaText.className = "qnaText";
        qnaText.innerHTML = `<p style="font-weight:bold">${i + 1}) ${Q}...</p><p>${A}</p>`;
        qnaText.style.paddingLeft = "5px";

        mainDiv.append(qnaText);
    }


    // Style by class name here

}



