let isPublic = false;

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
    console.log(`Bubble was clicked`);

    const bubble = document.getElementById(`bubble`); // Getting the original bubble div
    const bubbleClone = bubble.cloneNode(true); // Cloning bubble into bubbleClone
    bubbleClone.id = `bubbleClone`; // Changing cloned bubble to bubbleClone
    const { width, height } = bubble.getBoundingClientRect(); // Getting Original bubbles width and height

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


    //// Adding children
    addMinimizeButton(bubbleClone);
    addInfoBox(bubbleClone);
    if (isPublic) {

        //addListBox(bubbleClone);
    } else {
        askForPin(bubbleClone);
    }
}

function askForPin(bubbleClone) {
    let mainDiv = document.createElement('div');
    let inputBox = document.createElement('input');
    let tryButton = document.createElement('button');
    mainDiv.id = "mainDiv";
    inputBox.id = "inputBox";
    tryButton.id = "tryButton";
    tryButton.innerHTML = "Connect";

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
    )

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
    console.log("Pin entered: ", pin);

    checkInput(pin).then((a) => {
        isPublic = true;
        // Pin is valid
    })
        .catch((e) => { displayMessage(e) });
}


function addMinimizeButton(bubbleClone) {
    let button = document.createElement('div');
    button.innerHTML = "❌";


    // Styling button
    button.setAttribute(`style`,
        `
        top: 0;
        left:210px;
        position: relative;
        width:40px;
        height: 30px;
        z-index:1003;
        border-radius: 5px 22px 5px 0px;
        text-align: center;
        font-size: 20px;
        padding-top: 10px;
        user-select:none;
        color:white;
        `
    )
    button.addEventListener("mouseover", (e) => { button.style.cursor = "pointer"; });
    button.addEventListener("click", closeBubble);

    bubbleClone.append(button);
}

function addInfoBox(bubbleClone) {
    let infoBox = document.createElement('div');
    infoBox.id = "infoBox";
    let infoText = document.createElement('p');
    infoText.id = "infoText";


    // Styling info box
    infoBox.setAttribute(`style`,
        `
        margin:0;
        background-color:#fcc600;
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 20%;
        z-index:1002;
        border-radius: 22px 22px 5px 5px;
        text-align: center;
        user-select:none;
        font-family: helvetica;
        `
    );

    // Styling info infoText
    infoText.setAttribute(`style`,
        `
        margin-top:0px;
        padding-top:5px;
        position: relative;
        left:0;
        width:210px;
        border-radius: 22px 0px 0px 0px;
        font-size: 18px;
        font-weight: bold;
        color:black;
    
        `
    );



    bubbleClone.append(infoBox);
    infoBox.append(infoText);
    displayMessage("Welcome!")
}



function displayMessage(message) {
    document.getElementById("infoText").innerHTML = message;
}

function closeBubble() {
    console.log("Closing Remote")

    let bubble = document.getElementById("bubble");
    let remote = document.getElementById("bubbleClone");
    remote.remove();
    bubble.style.opacity = `1`;
}
















var expand = false;
window.addEventListener('keydown', (event) => {
    if (!expand && event.ctrlKey && event.key === `Shift`) {
        expandBubble();
        expand = true;
        console.log(bubble.id);
    }
});








createBubble();