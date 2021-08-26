let isPublic = false;
let json;


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
        addSecondaryButton("📑", viewAllQnA);
        addSwitch(mainDiv, "Incognito");
        addSwitch(mainDiv, "Shuffle");
        addSwitchStyling();

        //addAccordClickEvents();
        //addAccordStyling();
    } else {
        askForPin(bubbleClone);
        addSecondaryButton("❔", viewInfo);
    }
}

function checkToggles(e) {
    console.log(e);
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
        default:
            Console.error("Default")
            
    }
}

function addSwitch(mainDiv, name){
    let switchDiv = document.createElement('div');
    switchDiv.className = "switch";

    let switchText = document.createElement('div');
    switchText.className = "switchText"
    switchText.innerText = name;

    //ToggleBtns are just name + Toggle
    let toggleBtn = document.createElement('input');
    toggleBtn.id = `${name}Toggle`;
    toggleBtn.className = "toggleBtn";
    toggleBtn.type = "checkbox";
    if(Incognito && name === "Incognito" ){toggleBtn.checked = true;}
    toggleBtn.addEventListener('change', checkToggles);
    

    switchDiv.appendChild(switchText);
    switchDiv.appendChild(toggleBtn);

    mainDiv.appendChild(switchDiv);
}

function addSwitchStyling(){
    let switches = document.getElementsByClassName("switch");
    let i = 0;
    for(i; i < switches.length; i++){
        switches[i].style.backgroundColor = "#fff";
        switches[i].style.width = "100%";
        switches[i].style.paddingTop = "0.5em";
        switches[i].style.paddingBottom = "0.5em";
        switches[i].style.borderBottom = "solid gray 1px";
    }

    let switchTexts = document.getElementsByClassName("switchText");
    for(i = 0; i < switchTexts.length; i++){
        switchTexts[i].style.display = "inline";
    }

    let toggleBtns = document.getElementsByClassName("toggleBtn");
    for(i = 0; i < toggleBtns.length; i++){
        toggleBtns[i].style.float = "right";
        toggleBtns[i].style.marginRight = "1em";
    }
}

function addAccordion(mainDiv, name){

    let accord = document.createElement('div');
    accord.className = "accordion";

    let accordText = document.createElement('div');
    accordText.className = "accordText"
    accordText.innerText = name;

    let panel = document.createElement('div');
    panel.className = "panel";

    //ToggleBtns are just name + Toggle
    let toggleBtn = document.createElement('input');
    toggleBtn.id = `${name}Toggle}`;
    toggleBtn.type = "checkbox";

    panel.appendChild(toggleBtn);
    accord.appendChild(accordText);
    accord.appendChild(panel);

    mainDiv.appendChild(accord);
}

function addAccordClickEvents(){
    let accords = document.getElementsByClassName("accordText");
    let i = 0;
    for(i; i < accords.length; i++){
        let accord = accords[i];
        accord.addEventListener("click", function(){
            accord.classList.toggle("active");
            let panel = accord.nextSibling;
            if(panel.style.display == "block"){
                panel.style.display = "none";
            }else{
                panel.style.display = "block";
            }
        });
    }
}

function addAccordStyling(){
    let accords = document.getElementsByClassName("accordion");
    let i = 0;
    for(i; i < accords.length; i++){
        accords[i].style.cursor = "pointer";
        accords[i].style.backgroundColor = "#fff";
        accords[i].style.width = "100%";
        accords[i].style.transition = "0.4s";
    }
    
    let panels = document.getElementsByClassName("panel");
    for(i = 0; i < panels.length; i++){
        panels[i].style.display = "none";
        panels[i].style.overflow = "hidden";
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
    console.log("Pin entered: ", pin);

    checkInput(pin).then((a) => {
        console.log("IN HERE");
        parse(a).then((b) => {
            isPublic = true;
            json = b;
            highlight(json);
            viewModes();
        }).catch((e) => { displayMessage(e) });
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
function clearMainDiv() {
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "";
}

function closeBubble() {
    console.log("Closing Remote")

    let bubble = document.getElementById("bubble");
    let remote = document.getElementById("bubbleClone");
    remote.remove();
    bubble.style.opacity = `1`;
}

function addSecondaryButton(icon, onClickFunc) {
    console.log("Adding secondary button");
    let bubbleClone = document.getElementById("bubbleClone");
    let secondaryButton = document.getElementById("secondaryButton");
    //inside of create list box
    if (secondaryButton) {
        secondaryButton.remove();
    }
        
    secondaryButton = document.createElement("div");
    secondaryButton.id = "secondaryButton";
    secondaryButton.innerHTML = `${icon}`;
    secondaryButton.setAttribute(`style`,
        `
    top: 30;
    left:210px;
    position: relative;
    width:40px;
    height: 30px;
    z-index:1003;
    border-radius: 5px 22px 5px 0px;
    text-align: center;
    font-size: 20px;
    padding-top: 0px;
    user-select:none;
    `
    );
    secondaryButton.addEventListener("mouseover", (e) => { secondaryButton.style.cursor = "pointer"; });
    secondaryButton.addEventListener("click", onClickFunc);
    

    bubbleClone.append(secondaryButton);
        
}

function viewModes() {
    clearMainDiv();
    addSwitch(mainDiv, "Incognito");
    addSwitch(mainDiv, "Shuffle");
    addSwitchStyling();
    addSecondaryButton("📑", viewAllQnA)
}

function viewInfo() {
    console.log("TODO: viewInfo");
}

function viewAllQnA() {
    console.log("IN: viewAllQnA");
    clearMainDiv();
    let mainDiv = document.getElementById("mainDiv");

    addSecondaryButton("👈", viewModes);



    console.log(json);
    // parse json DATA
    for (let i = 0; i < json.length; i++) {
        let Q = json[i]["question"];
        let A = json[i]["answers"];
        let qnaText = document.createElement("p");
        qnaText.className = "qnaText";
        qnaText.innerHTML = `${i+1}) ${Q} | ${A}`;
        mainDiv.append(qnaText);
    }

    // Style by class name here

}














var expand = false;
window.addEventListener('keydown', (event) => {
    if (!expand && event.ctrlKey && event.key === `Shift`) {
        expandBubble();
        expand = true;
        console.log(bubble.id);
    } else {
        expand = false;
        closeBubble();
    }
});








createBubble();