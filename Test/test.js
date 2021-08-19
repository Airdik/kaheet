// function temp() {
//     let num1 = 2;
//     let num2 = 8;
//     let expected = 10;
//     let isValid = add(num1, num2) == expected;
//     console.log("Add ", isValid));
// }

// temp();
/*
const body = document.getElementsByTagName('body');
const testId = 'b363f7e6-5bd5-4e4c-8bea-250868a2a12d';

async function testCheckInput() {

    let json = await checkInput(testId);
    let isValid = json != 'QuizID not found';

    body.innerHTML = `CheckInput: ${isValid}`;
}

function testParse() {
    


    body.innerHTML = '';
}*/


////// Call all functions



(async() => {

    const testId = 'b363f7e6-5bd5-4e4c-8bea-250868a2a12d';
    console.log("HELLO");

    async function testInput(){
        console.log("STARTING TEST");
        let output = await checkInput(testId);
        console.log(output);
        alert("STOPPED");
    }

    testInput();

});
