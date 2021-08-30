// VIEWs
function viewModes() {
    clearMainDiv();
    displayMessage("Choose a mode any mode!")
    addModes();
}
function viewInfo() {
    displayMessage("Thanks for using Kheet!")
    console.log("TODO: viewInfo");
}
function viewAllQnA() {
    console.log("IN: viewAllQnA");
    displayMessage("All of the answers are below.")
    clearMainDiv();
    let mainDiv = document.getElementById("mainDiv");

    addSecondaryButton("👈", viewModes);

    var css = `
        ::-webkit-scrollbar {
    width: 3px;
    height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -webkit-border-radius: 6px;
    border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 6px;
    border-radius: 6px;
    background: rgba(240,58,23,0.8);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(240,58,23,0.4);
}
    
    `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }


    mainDiv.style.overflowY = "auto";
    console.log(json);
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

