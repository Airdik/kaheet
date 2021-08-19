// function temp() {
//     let num1 = 2;
//     let num2 = 8;
//     let expected = 10;
//     let isValid = add(num1, num2) == expected;
//     console.log("Add ", isValid));
// }

// temp();

console.log("////STARTING TESTS////")

const testId = 'b363f7e6-5bd5-4e4c-8bea-250868a2a12d';

async function testCheckInput() {

    console.log("TEST: CheckInput")
    
    await checkInput(testId)
    .then(function(value){ //If gets back a resolve promise (no error)
        console.log("UNIT TEST(CheckInput): Success");
    }).catch((error) => { //If gets back a reject promise (error)
        console.error("UNIT TEST(CheckInput): Failed");
    });
}

async function testParse() {
    
    await checkInput(testId)
    .then(function(value){

        parse(value).then(function(value2){
          console.log("UNIT TEST(Parse): Success");
        });

    }).catch((error) => {
        console.error("UNIT TEST(Parse): Failed");
    });
}



/////////////////////// CALLING TESTS
testCheckInput();
testParse();

console.log("////END TESTS")