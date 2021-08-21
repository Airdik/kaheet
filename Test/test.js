const testId = 'b363f7e6-5bd5-4e4c-8bea-250868a2a12d';

function testCheckInput() {

    return new Promise(function (resolve, reject) {

        checkInput(testId)
            .then(function (value) { //If gets back a resolve promise (no error)
                resolve(true);
            }).catch((error) => { //If gets back a reject promise (error)
                reject(error);
            });

    });
    
}

function testParse() {
    return new Promise(function (resolve, reject) {
        checkInput(testId)
            .then(function (value) {

                parse(value).then(function (value2) {
                    resolve(true);
                });

            }).catch((error) => {
                reject(error);
            });

    });
    
}



//////////             //////////

async function TEST(func) {

    console.group(`%c TESTING: ${func.name}`, "color:Coral;");
    console.time(`${func.name}`);

    await func().then(function (a) {
        console.groupCollapsed(`%c ${func.name}: PASSED`, "color: Chartreuse;");
        console.timeEnd(`${func.name}`);
        console.groupEnd();
    }).catch((err) => {
        console.groupCollapsed(`%c ${func.name}: FAILED`, "color: Red;");
        console.log("%c" + err, "color:DeepPink;");
        console.timeEnd(`${func.name}`);
        console.groupEnd();
    });
    console.groupEnd();
}



//////////      CALLING ALL TESTS       //////////
console.log("%c ========STARTING TESTS========\n", "color: Yellow;")
await TEST(testCheckInput);
await TEST(testParse);


console.log("%c \n=========END OF TESTS=========", "color: Yellow;")