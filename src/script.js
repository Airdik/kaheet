let quizType;
//Modes
let Incognito = true;
let Shuffle = false;
let Autopilot = false;
let Theme = false;
let speedValue = 0;
let accuracyValue = 100;

// -------------------------- notify -------------------------- //
// Show welcome notification

function notify() {
    console.clear();
    console.log(`%c\nKaheet made by pxtrez\nIt's only cheating if you get caught.`, "color:#ff66ff");
    let s = `Thank you for using Kaheet! I recommend that you read the docs before use!\nhttps://pxtrez.github.io/kaheet/\nPheaServices © 2021\nEducational purposes only!`;
    console.log(s);
    alert(s);
}



// -------------------------- getInput -------------------------- //
/**
 * Prompts user for quiz id
 * from host's screen.
 * @returns The user's input or a rejection on empty input
 */
 function getInput() {
    return new Promise((resolve, reject) => {
        let input = prompt(`
📜 Enter the last part of link, that's visible on the teacher's screen.
❓  Where's quizID?
🔗 https://play.kahoot.it/v2/lobby?quizId= [ quizID ]
🔗 https://kahoot.it/challenge/ [ quizID ]
⚠️  Remember that the quizID is not the same as the quiz join code
⚠️  Getting answers by quiz join code is not supported yet
⚠️  Kaheet is 100% safe, which means it's not a virus or crap like that
❌ TO EXIT CLICK F5
           `);
        if (input) { input.trim() !== "" ? resolve(input) : reject('Empty input'); }else{ reject('No input');}
    });
}





/**
 * Checks quiz ID
 * @param {*} input 
 * @returns 
 */
function checkInput(input) {
    return new Promise(async(resolve, reject) => {
        const kahoot = await fetch(`https://kahoot.it/rest/kahoots/${input}`); // Trying to find the Kahoot game by input (Game ID)

        if (!kahoot.ok || kahoot.status === 400) { // Checking if the fetch is not ok
            const challenge = await fetch(`https://kahoot.it/rest/challenges/${input}/answers`);
            const json = await challenge.json();

            if (!challenge.ok || challenge.status === 400
            ) {
                //--console.log(`⚠️  Error: QuizID not found!`);
                return reject('QuizID not found');
            } else {
                quizType = "challenge";
                //--console.log(`✔️  QuizID found!`);
                resolve(json.challenge.kahoot);
            }
        } else {
            //--console.log(`✔️  QuizID found!`);
            const json = await kahoot.json();
            resolve(json);
        }
    });
}




// -------------------------- parse -------------------------- //
/**
 * Is passed in json question data,
 * Parses each question and converts them
 * into a new questionData object, then stores
 * in an array and returns
 * @param {*} json 
 * @returns An array of parsed questionData objects
 */

 function parse(json) {
    return new Promise((resolve) => {
        let returnData = [];
        let questions = json.questions;

        //Loop through each question
        questions.forEach(question => {
            questionData = {
                question: question.question, //Question Prompt
                type: question.type, //Type of Question
                answers: [], //Text Form of the answer
                check: [], //Indexs of wrong choices
                correct: [], //Index of correct answer(s) (could have more than one correct answer)
                skip: false
            }

            if (
                question.type === "content" ||
                question.type === "multiple_select_poll" ||
                question.type === "survey"
            ) {
                questionData.skip = true;
            }

            if (question.choices)
            {
                //Loop through each choice in the question
                question.choices.forEach((choice, index) => {
                    if (choice.correct) {
                        questionData.correct.push(index);

                        choice.answer ?
                            questionData.answers.push(choice.answer) :
                            questionData.answers.push('[ FAILED ]');

                    } else
                        questionData.check.push(index);
                });
            }
                
            //Push parsed data object to returnData Array
            returnData.push(questionData);
        });

        //--answersToConsole(returnData);

        if (quizType === "challenge") {
            alert(`Ugh! We've detected, that you're running challenge mode! \nFor all answers, you have to check the console!`);
            alert(`If you want to have time to search current question, \nyou can pause quiz timers by typing 'pause()' in console!`);
            resolve(true)
        } else {
            resolve(returnData);
        }
    });
}



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

            if (index != undefined && index != null && index >=0) {
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

                    if( type === "quiz" || type === "multiple_select_quiz") {

                        if (document.querySelector(
                            `[data-functional-selector="answer-1"]`
                        ) !== null) {
                            // For each invalid answer, turning it black
                            
                            let isCorrect = false;
                            let choiceCount = 0;
                            let correctCount = 0;
                            
                            if(Math.random() * 100 <= accuracyValue){
                                isCorrect = true;
                            }
                            check.forEach(i => {
                                let element = document.querySelector(
                                    `[data-functional-selector="answer-${i}"]`
                                    );
                                    if(Autopilot && !isCorrect){
                                            if(type === "quiz"){
                                                setTimeout((e) => {element.click();}, (speedValue * 1000));
                                            }else{
                                                if(!selectedAll1){
                                                    element.click();
                                                    choiceCount++;
                                                    if(choiceCount == check.length){
                                                        selectedAll1 = true;
                                                    }
                                                }else{
                                                    let submit = document.querySelector('[data-functional-selector="multi-select-submit-button"]');
                                                    setTimeout((e) => {submit.click(); selectedAll1 = false;}, (speedValue * 1000));
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
                                    if(Autopilot && isCorrect){
                                            if(type === "quiz"){
                                                setTimeout((e) => {element.click();}, (speedValue * 1000));
                                            }else{
                                                if(!selectedAll2){
                                                    element.click();
                                                    correctCount++;
                                                    if(correctCount == correct.length){
                                                        selectedAll2 = true;
                                                    }
                                                }else{
                                                    let submit = document.querySelector('[data-functional-selector="multi-select-submit-button"]');
                                                    setTimeout((e) => {submit.click(); selectedAll2 = false;}, (speedValue * 1000));
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
                                        element.addEventListener('mouseover', (e)=>{element.style.cursor = 'progress' })
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




// -------------------------- pause -------------------------- //
/**
 * Alerts the user they paused the game timer
 */
 function pause() {
    alert(`Now you can search your question without loosing time!
Remember, that teacher can see illegal time!
To resume, click 'OK' below`)
}




// -------------------------- answersToConsole -------------------------- //
/**
 * Loops through each question(from the json)
 * Prints in the console the question prompt,
 * the number of answers, then the answers.
 * Styles the answers too.
 * @param {*} json 
 */
 function answersToConsole(json) {
    json.forEach(question => {
        if (!question.skip) {
            console.log(`
%c❓ Question: %c${question.question}
%c📝 Answers (${question.answers.length}): %c\n${question.answers.join('\n')}`,
                'color:orange;font-size:15px;',
                'color:white;font-size:20px;',
                'color:yellow;font-size:15px;',
                'color:white;font-size:20px;border:orange 1px solid;'
            );
        }
    });
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
    let text = Incognito ? "Kaheet has been injected!" : "hi";

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


// -------------------------- init -------------------------- //
/**
 * Staring point of the code
 */
(async() => {
    theme();
})();



