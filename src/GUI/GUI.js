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

}
// Tool bubble on click
function expandBubble() {
    expand = true;

    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";


// CSS for scroll bar
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
        askForPin();
        addSecondaryButton("❔", viewInfo);
    }
}
function checkToggles(e) {
    let id = e.target.id;
    switch (id) {
        case "IncognitoToggle":
            Incognito = !Incognito;
            Theme = !Incognito;
            break;
        case "ShuffleToggle":
            Shuffle = !Shuffle;
            break;
        case "AutopilotToggle":
            Autopilot = !Autopilot;
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
            speedSliderValue = `${target.value}`;
            break;
            case "accuracySlider":
            accuracyValue = target.value;
            accuracySliderValue = `${target.value}`;
            break;
    }
}
function askForPin() {
    clearMainDiv();
    let mainDiv = document.getElementById('mainDiv');
    let inputBox = document.createElement('input');
    let tryButton = document.createElement('button');
    let bubbleClone = document.getElementById('bubbleClone');
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

    addSecondaryButton("❔", viewInfo);

    bubbleClone.append(mainDiv);
}
function validatePin() {
    let pin = document.getElementById("inputBox").value;

    if (pin == undefined || pin == null) { displayMessage("Enter an ID first!", true); return;}

    checkInput(pin).then((a) => {
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

    let bubble = document.getElementById("bubble");
    let remote = document.getElementById("bubbleClone");
    remote.remove();
    bubble.style.opacity = Incognito ? 0 : 1;
}


var lastTime = new Date().getSeconds();
window.addEventListener('keydown', (event) => {
    
    if (event.ctrlKey && event.key === `Shift`) {
        let currentTime = new Date().getSeconds();
        let difference = currentTime - lastTime;

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