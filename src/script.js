let quizType;
//Modes
let Incognito = true;
let Shuffle = false;
let Autopilot = false;
let Theme = false;
let speedValue = 0;
let accuracyValue = 100;




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

        if (quizType === "challenge") {
            displayMessage(`Ugh! We've detected, that you're running challenge mode! \nFor all answers, you have to check the console!`);
            alert(`If you want to have time to search current question, \nyou can pause quiz timers by typing 'pause()' in console!`);
            resolve(true)
        } else {
            resolve(returnData);
        }
    });
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









// -------------------------- init -------------------------- //
/**
 * Staring point of the code
 */
(async() => {
    theme();
})();



