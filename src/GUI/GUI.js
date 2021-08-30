let isPublic = false;
let json;
var expand = false;



// GUI
// Creating the tool bubble
function createBubble() {
    var bubble = document.createElement(`div`); // Main bubble div
    bubble.id = "bubble"; // Giving div an id
    var bubbleText = document.createElement("p"); // p tag inside of bubble div
    bubbleText.id = `bubbleText`; // Giving p tag an id
    bubbleText.appendChild(document.createTextNode(`👀`)); // Adding text to the p tag

    // Styling the bubble, <div>
    //TEMP: Kahoot color: #46178f
    bubble.setAttribute(`style`,
        `background-color:#ffde34;
    height: 50px;
    width: 50px;
    position: fixed;
    bottom: 5px; right: 5px;
    border-radius: 22px 22px 5px 22px;
    user-select:none;
    z-index:1000;
    `
    );
   

    // Styling bubble text, <p>
    bubbleText.setAttribute(`style`,
        `
    margin: auto;
    font-size: 25px;
    width: 25 %;
    color: white;
    text-align: center;
    padding-top:12px;
    `
    );


    // Appending
    bubble.appendChild(bubbleText); // Appending the p tag to the bubble div
    document.body.appendChild(bubble); // Adding bubble to the page

    // Adding on click listener
    bubble.addEventListener(`click`, expandBubble);
    bubble.addEventListener("mouseover", (e) => { bubble.style.cursor = "pointer"; });

    console.log(`Bubble created`);
}
// Tool bubble on click
function expandBubble() {
    expand = true;
    console.log(`Bubble was clicked`);

    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";


    // Styling main div
    mainDiv.setAttribute(`style`,
        `
        position:absolute;
        top:70px;
        left:0;
        height:280px;
        width:100%;
        border-radius: 0px 0px 22px 22px;
        `
    );

    let bubble = document.getElementById(`bubble`); // Getting the original bubble div
    let bubbleClone = bubble.cloneNode(true); // Cloning bubble into bubbleClone
    bubbleClone.id = `bubbleClone`; // Changing cloned bubble to bubbleClone
    let { width, height } = bubble.getBoundingClientRect(); // Getting Original bubbles width and height

    // Cloning each setAttribute from original bubble to the clone bubble
    bubbleClone.setAttribute(`style`,
        `position: fixed;
        width:${width}px;
        height:${height}px;
        background-color:#ffde34;
        border-radius: 22px 22px 5px 22px;
        z-index: 1001;
        margin: auto;
        bottom: 5px;
        right: 5px;
        align-items:center;
        `
    );
    bubble.style.opacity = `0`; // Hiding original bubble
    bubble.parentNode.appendChild(bubbleClone);

    // Setting expand animation on clone bubble
    requestAnimationFrame(() => {
        bubbleClone.style.transition =
            //`width 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51),
            //height 400ms cubic-bezier(0.18, 0.89, 0.05, 1.51)
            `width 200ms ease-in,
            height 200ms ease-in
            `;

        // Animate expand of div to these units
        bubbleClone.style.width = `250px`;
        bubbleClone.style.height = `350px`;



    });

    bubbleClone.innerHTML = ''; // Removing all child elements form clone bubble;
    bubbleClone.append(mainDiv); // Adding main div to the page after the bubble is expanded
    


    //// Adding children
    addMinimizeButton(bubbleClone);
    addInfoBox(bubbleClone);
    if (isPublic) {
        addModes();

        //addAccordClickEvents();
        //addAccordStyling();
    } else {
        askForPin(bubbleClone);
        addSecondaryButton("❔", viewInfo);
    }
}
function checkToggles(e) {
    console.log("ID: ", e.target.id);
    let id = e.target.id;
    switch (id) {
        case "IncognitoToggle":
            console.log("Toggled Incognito");
            Incognito = !Incognito;
            Theme = !Incognito;
            break;
        case "ShuffleToggle":
            Shuffle = !Shuffle;
            break;
        case "AutopilotToggle":
            Autopilot = !Autopilot;
            console.log("IN AUTOPILOT");
            break;
        default:
            Console.error("Default")
            
    }
}
function checkSlider(e){
    let target = e.target;
    target.nextSibling.innerText = target.value;
    let id = target.id;

    switch(id){
        case "speedSlider":
            speedValue = target.value;
            break;
            case "accuracySlider":
            accuracyValue = target.value;
            break;
    }
}
function askForPin(bubbleClone) {
    let mainDiv = document.getElementById('mainDiv');
    let inputBox = document.createElement('input');
    let tryButton = document.createElement('button');
    inputBox.id = "inputBox";
    tryButton.id = "tryButton";
    tryButton.innerHTML = "Connect";

 

    // Styling button
    inputBox.setAttribute(`style`,
        `
        margin:auto;
        position: relative;
        top:50px;
        left:4.3%;
        border: 0px;
        width:90%;
        height: 12%;
        z-index:1002;
        border-radius: 22px 22px 22px 22px;
        text-align: center;
        justify-content: center;
        outline: none;
        font-size: 20px;
        user-select:none;
        color:black;
        `
    );

    tryButton.setAttribute(`style`,
        `
    margin:auto;
    position: relative;
    top:60px;
    left:30%;
    border: 0px;
    width:40%;
    height: 12%;
    z-index:1002;
    border-radius: 22px 22px 22px 22px;
    text-align: center;
    justify-content: center;
    outline: none;
    font-size: 20px;
    user-select:none;
    color:black;
    `
    );

    inputBox.placeholder = "Quiz ID"
    displayMessage("Enter Quiz ID below");

    tryButton.addEventListener("mouseover", (e) => { tryButton.style.cursor = "pointer"; });
    tryButton.addEventListener("click", validatePin);

    mainDiv.append(inputBox);
    mainDiv.append(tryButton)

    bubbleClone.append(mainDiv);
}
function validatePin() {
    let pin = document.getElementById("inputBox").value;

    checkInput(pin).then((a) => {
        console.log("IN HERE");
        parse(a).then((b) => {
            isPublic = true;
            json = b;
            highlight(json);
            viewModes();
        }).catch((e) => { displayMessage(e, true) });
        // Pin is valid
    })
    .catch((e) => { displayMessage(e, true) });
}
function displayMessage(message, error = false) {
    let infoDiv = document.getElementById("infoText");
    infoDiv.style.color = error ? "red" : "black";
    infoDiv.innerHTML = message;
}
function clearMainDiv() {
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "";
}
function closeBubble() {
    expand = false;
    console.log("Closing Remote")

    let bubble = document.getElementById("bubble");
    let remote = document.getElementById("bubbleClone");
    remote.remove();
    bubble.style.opacity = Incognito ? 0 : 1;
}


var lastTime = new Date().getSeconds();
console.log("First TIme:",lastTime);
window.addEventListener('keydown', (event) => {
    console.log("A key was pressed");
    
    if (event.ctrlKey && event.key === `Shift`) {
        let currentTime = new Date().getSeconds();
        let difference = currentTime - lastTime;

        console.log("currentTIme", currentTime);
        console.log("Difference", difference)
        if (!(difference > 1)) { if (difference < 0) { currentTime = 0; lastTime = 1;} return; }


        lastTime = new Date().getSeconds();
        if (!expand) {
            expandBubble();
        } else {
            closeBubble();
            
        }
    }
});








createBubble();