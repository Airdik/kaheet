// -------------------------- highlight -------------------------- //
// Show correct answers
/**
 * Gets data from array of data from parse
 * Goes through parse data and styles accordingly
 * 
 * @param {*} data 
 */
let selectedAll1 = false;
let selectedAll2 = false;
function highlight(data) {
    console.log("IN HIGHLIGHT");
    if (typeof data === 'boolean') return;

    setInterval(() => {

        let index;
        try {
            index = JSON.parse(
                localStorage.getItem("kahoot-game_session")
            ).questionNumber;

        } catch (e) { }

        if (index != undefined && index != null && index >= 0) {
            let {
                type,
                check,
                correct,
                answers
            } = data[index];

            if (
                type !== "content" && type !== "multiple_select_poll") {

                let box = document.querySelector(
                    "#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.status-bar__ContentBar-ivth8h-0.status-bar__TopBar-ivth8h-1.gCnEqt.GFKFx.top-bar__TopBar-sc-186o9v8-0.bIPhxy.question__TopBar-sc-12j7dwx-0.buBRpJ > div"
                );

                if (box) {
                    let text = answers.join("</p><p>");
                    if (box.style.display !== 'grid') {
                        box.style.display = 'grid';
                        box.style.fontSize = "25px";
                        box.style.textAlign = 'left';
                        box.style.lineHeight = '1.3';
                        box.innerHTML = `<p><p style="font-size: xxx-large;color: #00fff8;">Correct ${correct.length}/${correct.length + check.length} answers:</p><p>${text}</p><p style="color: lime;">Question type: ${type}`;
                    }
                }

                if (type === "quiz" || type === "multiple_select_quiz") {

                    if (document.querySelector(
                        `[data-functional-selector="answer-1"]`
                    ) !== null) {
                        // For each invalid answer, turning it black

                        let isCorrect = false;
                        let choiceCount = 0;
                        let correctCount = 0;

                        if (Math.random() * 100 <= accuracyValue) {
                            isCorrect = true;
                        }
                        check.forEach(i => {
                            let element = document.querySelector(
                                `[data-functional-selector="answer-${i}"]`
                            );
                            if (Autopilot && !isCorrect) {
                                if (type === "quiz") {
                                    setTimeout((e) => { element.click(); }, (speedValue * 1000));
                                } else {
                                    if (!selectedAll1) {
                                        element.click();
                                        choiceCount++;
                                        if (choiceCount == check.length) {
                                            selectedAll1 = true;
                                        }
                                    } else {
                                        let submit = document.querySelector('[data-functional-selector="multi-select-submit-button"]');
                                        setTimeout((e) => { submit.click(); selectedAll1 = false; }, (speedValue * 1000));
                                    }
                                }
                            }

                            if (!Incognito) {
                                if (element.style.transition !== '0.5s') {
                                    element.style.transition = '0.5s';
                                    element.style.opacity = 0.2;
                                    element.style.filter = "blur(3px) grayscale(1)";
                                }
                            } else {
                                element.style.cursor = 'not-allowed';
                                element.style.opacity = 1;
                                element.style.filter = "";
                            }
                        });

                        // For each correct answer, turning it lime green
                        correct.forEach(i => {
                            let element = document.querySelector(
                                `[data-functional-selector="answer-${i}"]`);
                            if (Autopilot && isCorrect) {
                                if (type === "quiz") {
                                    setTimeout((e) => { element.click(); }, (speedValue * 1000));
                                } else {
                                    if (!selectedAll2) {
                                        element.click();
                                        correctCount++;
                                        if (correctCount == correct.length) {
                                            selectedAll2 = true;
                                        }
                                    } else {
                                        let submit = document.querySelector('[data-functional-selector="multi-select-submit-button"]');
                                        setTimeout((e) => { submit.click(); selectedAll2 = false; }, (speedValue * 1000));
                                    }
                                }
                            }
                            if (!Incognito) {
                                if (element.style.transition !== '0.5s') {
                                    element.style.transition = '0.5s';
                                    element.style.filter = 'contrast(2)';
                                    element.style.border = 'orange solid 10px';
                                    element.style.borderRadius = '5px';

                                }
                            } else {
                                element.style.border = "";
                                element.style.borderRadius = '8px';
                                element.addEventListener('mouseover', (e) => { element.style.cursor = 'progress' })
                            }
                        });
                    }
                }

            }
            if (type === "open_ended") {
                let element = document.querySelector(
                    `[data-functional-selector="text-answer-input"]`
                );
                if (element)
                    element.placeholder = answers[0];
            }
        }
        console.log("CHECKING");



    }, 50);
}


// -------------------------- doFunc -------------------------- //
/**
 * Gets passed in elements and styles, and applies the styles to the elements
 * 
 * @param {*} selector - the elements being styled
 * @param {*} functions - the style getting applied to the element
 */
function doFunc(selector, functions) {
    // You can modify this values
    let main;
    let text;
    let background;
    let border;

    if (Theme) {
        main = "black";
        text = "white";
        background = "url('https://gifimage.net/wp-content/uploads/2017/09/black-and-white-gif-background-tumblr-7.gif')";
        border = "solid yellow 10px";
    } else {
        main = "white";
        text = "black";
        background = "";
        border = "solid red 20px";
    }
    //
    let element = document.querySelector(selector);
    if (element) {
        functions.forEach(func => {
            eval(func);
        });
    };
}





// -------------------------- theme -------------------------- //
/**
 * Changes the kahoot theme
 */
function theme() {
    let text = !Incognito ? "Kaheet has been injected!" : "hi";

    let elements = {
        nameholder: { // Name
            elems: [ // What element
                '[data-functional-selector="nickname-status-bar"]'
            ],
            do: [ // What style to do the the element

                `element.innerHTML = '${text}'`
            ]
        },
        nav: {
            elems: [
                '[data-functional-selector="controller-top-bar"]'
            ],
            do: [
                "element.style.backgroundColor = main",
                "element.style.color = text"
            ]
        },
        footer: {
            elems: [
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.status-bar__ContentBar-ivth8h-0.status-bar__BottomBar-ivth8h-2.gCnEqt.deQFTW.bottom-bar__BottomBar-sc-1bibjvm-0.cNyMFo',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div'
            ],
            do: [
                "element.style.backgroundColor = main",
                "element.style.color = text"
            ]
        },
        contentBg: {
            elems: [
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.question__PageMainContent-sc-12j7dwx-1.fMGBvU',
            ],
            do: [
                "element.style.backgroundColor = main",
            ]
        },
        bg: {
            elems: [
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.styles__ResultPageMainContent-sc-15a2o5w-1.bMYQoA',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.styles__ResultPageMainContent-sc-15a2o5w-1.bMYQoA',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > main',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.background__Background-sc-15eg2v3-0.kPfwDm.sent__Background-sc-1s8zmdp-1.ffyYDa',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.wait-for-next-question__MainContainer-sc-1jhgzye-4.bXhFLq',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.background__Background-sc-15eg2v3-0.kPfwDm > div',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > div > main',
            ],
            do: [
                "element.style.backgroundImage = background",
                "element.style.backgroundSize = 'cover'"
            ]
        },
        dragbox: {
            elems: [
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.question__PageMainContent-sc-12j7dwx-1.fMGBvU > div > section > div:nth-child(1)',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.question__PageMainContent-sc-12j7dwx-1.fMGBvU > div > section > div:nth-child(2)',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.question__PageMainContent-sc-12j7dwx-1.fMGBvU > div > section > div:nth-child(3)',
                '#root > div.controller__AppWrapper-sc-1m4rw0k-0.hHwuuw > main > div.question__PageMainContent-sc-12j7dwx-1.fMGBvU > div > section > div:nth-child(4)',
            ],
            do: [
                "element.style.border = border"
            ]
        },

    };

    setInterval(() => {
        Object.keys(elements).forEach((element, index) => {
            let name = Object.keys(elements)[index];

            elements[name].elems.forEach(selector => {
                doFunc(selector, elements[name].do);
            });

        });
    });
}

