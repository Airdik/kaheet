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

    // Information about Kaheet and how to use it
    mainDiv.innerHTML =
        `<h1 style="font-weight:bold; text-align:center;">
            Kaheet is a free kahoot cheat originally by <a style="color:#0000EE;" href="https://github.com/pxtrez" target="_blank">pxtrez</a>
         </h1>
        
        <br>

        <h1 style="font-weight:bold; text-align:center;">
            Modified by <a style="color:#0000EE;" href="https://github.com/EShrestha" target="_blank">Airdik</a> and <a style="color:#0000EE;" href="https://github.com/Ratel8989" target="_blank">Ratel</a>
        </h1>
        
        <br>

        <h1 style="font-weight:bold;">
            Things to know
        </h1>

        <h2 style="font-weight:510; margin-left:1em;">
           How to connect
        </h2>

            <p style="margin-left:2em;">
                Enter quiz id from the url on the teachers screen into the input to connect, should look something like "quizID=[id here]"
            </p>

        <h2 style="font-weight:510; margin-left:1em;">
            Once Connected
        </h2>
            <p style="margin-left:2em;">
                You can select the modes you would like to turn on.
                    <p style="margin-left:3em;">
                        Incognito Mode is on by default
                    </p>
                    <p style="margin-left:3em;">
                        The bubble will be invisible. To open again, either click the bottom right of your screen or press <kbd>Ctrl</kbd> + <kbd>Shift</kbd>
                    </p>
            </p>
            <p style="margin-left:2em;">
                You can click 📑 to view all of the question and answers in text
            </p>

        `
    
    addSecondaryButton("👈", askForPin);
}

function viewAllQnA() {
    displayMessage("All of the answers are below.")
    clearMainDiv();
    let mainDiv = document.getElementById("mainDiv");

    addSecondaryButton("👈", viewModes);

    mainDiv.style.overflowY = "auto";
    // Loping through json data and adding it to the page
    for (let i = 0; i < json.length; i++) {
        let Q = json[i]["question"].substring(0, 28); // Question at index i
        let A = json[i]["answers"]; // Answer at index i
        let qnaText = document.createElement("p");
        qnaText.className = "qnaText";
        qnaText.innerHTML = `<p style="font-weight:bold">${i + 1}) ${Q}...</p><p>${A}</p>`;
        qnaText.style.paddingLeft = "5px";

        mainDiv.append(qnaText);
    }

}



