var speedSliderValue = "0";
var accuracySliderValue = "100";


///// Adding things to the GUI /////

function addModes() {
    addSecondaryButton("📑", viewAllQnA);
    addSwitch(mainDiv, "Incognito");
    //addSwitch(mainDiv, "Shuffle");
    addAccordion(mainDiv, "Autopilot");
    addAccordClickEvents();
    addAccordStyling();
    addSwitchStyling();
}

/**
 * @param {div} mainDiv the current page
 * @param {string} name name of the mode to add
 */
function addSwitch(mainDiv, name) {
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

    //When the modes page is opened, the toggle should be set to what it was previously
    if (Incognito && name === "Incognito") { toggleBtn.checked = true; }

    // Adding event listener to all of the toggles
    toggleBtn.addEventListener('change', checkToggles);

    // Adding name and toggle to the switch, then adding the switch to the page
    switchDiv.appendChild(switchText);
    switchDiv.appendChild(toggleBtn);
    mainDiv.appendChild(switchDiv);
}

/**
 * Styling all of the switches
 */
function addSwitchStyling() {
    let switches = document.getElementsByClassName("switch"); // Getting all switches in the page

    // Styling every switch
    let i = 0;
    for (i; i < switches.length; i++) {
        switches[i].style.backgroundColor = "#fff";
        switches[i].style.width = "100%";
        switches[i].style.paddingTop = "0.5em";
        switches[i].style.paddingBottom = "0.5em";
        switches[i].style.borderBottom = "solid gray 1px";
    }

    // Styling every switch text
    let switchTexts = document.getElementsByClassName("switchText");
    for (i = 0; i < switchTexts.length; i++) {
        switchTexts[i].style.display = "inline";
        switchTexts[i].style.marginLeft = "1em";

    }

    // Styling ever switch toggle
    let toggleBtns = document.getElementsByClassName("toggleBtn");
    for (i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].style.float = "right";
        toggleBtns[i].style.marginRight = "1em";
    }
}

/**
 * 
 * @param {div} mainDiv the current page
 * @param {string} name name of the mode to add
 */
function addAccordion(mainDiv, name) {
    let accord = document.createElement('div');
    accord.className = "accordion";

    let accordText = document.createElement('div');
    accordText.className = "accordText"
    accordText.innerHTML = `${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;

    let panel = document.createElement('div');
    panel.className = "panel";
    addPanelContent(panel);

    //ToggleBtns are just name + Toggle
    let toggleBtn = document.createElement('input');
    toggleBtn.id = `${name}Toggle`;
    toggleBtn.className = "toggleBtn";
    toggleBtn.type = "checkbox";


    //When the modes page is opened, the toggle should be set to what it was previously
    if (Autopilot && name === "Autopilot") { toggleBtn.checked = true; }


    // Adding event listener to all of the toggles
    toggleBtn.addEventListener('change', checkToggles);


    // Adding the name, toggle, and panel to the accordion then adding the according to the page
    accord.appendChild(accordText);
    accord.appendChild(toggleBtn);
    accord.appendChild(panel);
    mainDiv.appendChild(accord);
}

function addPanelContent(panel) {
    let speed = document.createElement("div");
    speed.id = "speedPanelContent";

    let speedText = document.createElement("p");
    speedText.innerText = "Wait Time (seconds):";
    speed.appendChild(speedText);

    let speedSlider = document.createElement("input");
    speedSlider.id = "speedSlider";
    speedSlider.type = "range";
    speedSlider.min = "0";
    speedSlider.max = "240";
    speedSlider.value = speedSliderValue;
    speed.appendChild(speedSlider);

    let speedValue = document.createElement("p");
    speedValue.id = "speedValue";
    speedValue.innerText = speedSliderValue;
    speed.appendChild(speedValue);

    speedSlider.addEventListener("input", checkSlider);


    let accuracy = document.createElement("div");
    accuracy.id = "accuracyPanelContent";

    let accuracyText = document.createElement("p");
    accuracyText.innerText = "Accuracy:";
    accuracy.appendChild(accuracyText);

    let accuracySlider = document.createElement("input");
    accuracySlider.id = "accuracySlider";
    accuracySlider.type = "range";
    accuracySlider.min = "0";
    accuracySlider.max = "100";
    accuracySlider.value = accuracySliderValue;
    accuracy.appendChild(accuracySlider);

    let accuracyValue = document.createElement("p");
    accuracyValue.id = "accuracyValue";
    accuracyValue.innerText = accuracySliderValue;
    accuracy.appendChild(accuracyValue);

    accuracySlider.addEventListener("input", checkSlider);

    panel.appendChild(speed);
    panel.appendChild(accuracy);
}

/**
 * 
 * @param {emoji} icon the icon that is shown on the page
 * @param {function} onClickFunc 
 */
function addSecondaryButton(icon, onClickFunc) {
    let bubbleClone = document.getElementById("bubbleClone");
    let secondaryButton = document.getElementById("secondaryButton");
    // Inside of create list box
    if (secondaryButton) {
        secondaryButton.remove();
    }

    // 
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

// Button to close the gui when clicked
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
        font-size: 16px;
        font-weight: bold;
        color:black;
        display:flex;
        height:100%;
        align-items:center;
        justify-content:center;
    
        `
    );

    bubbleClone.append(infoBox);
    infoBox.append(infoText);
    //displayMessage("Welcome!")
}

// Click events for all of the accordions
function addAccordClickEvents() {
    let accords = document.getElementsByClassName("accordText");
    let i = 0;
    for (i; i < accords.length; i++) {
        let accord = accords[i];
        accord.addEventListener("click", function () {
            accord.classList.toggle("active");
            let panel = accord.nextSibling.nextSibling;
            if (panel.style.display == "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

// Styling all of th accordions
function addAccordStyling() {
    let accords = document.getElementsByClassName("accordion");
    let accordTexts = document.getElementsByClassName("accordText");
    let panels = document.getElementsByClassName("panel");

    let i = 0;
    for (i; i < accords.length; i++) {
        accords[i].style.backgroundColor = "#fff";
        accords[i].style.width = "100%";
        accords[i].style.paddingTop = "0.5em";
        accords[i].style.paddingBottom = "0.5em";
        accords[i].style.borderBottom = "solid gray 1px";
        accords[i].style.transition = "0.4s";
    }

    for (i = 0; i < accordTexts.length; i++) {
        accordTexts[i].style.cursor = "pointer";
        accordTexts[i].style.display = "inline";
        accordTexts[i].style.marginLeft = "1em";
    }

    for (i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
        panels[i].style.overflow = "hidden";
        panels[i].style.paddingLeft = "2em";
        panels[i].style.paddingRight = "1em";

    }

    document.getElementById("speedValue").style.float = "right";
    //document.getElementById("speedValue").style.marginRight = "1em";
    document.getElementById("accuracyValue").style.float = "right";
    //document.getElementById("accuracyValue").style.marginRight = "1em";

}

