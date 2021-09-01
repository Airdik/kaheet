var testId = 'b363f7e6-5bd5-4e4c-8bea-250868a2a12d';

async function testCheckInput() {

    return new Promise(function (resolve, reject) {

        checkInput(testId)
            .then(function (value) { //If gets back a resolve promise (no error)
                resolve(true);
            }).catch((error) => { //If gets back a reject promise (error)
                reject(error);
            });

    });
    
}

async function testCheckInputPrivate() {

    return new Promise(function (resolve, reject) {

        checkInput("3ea49a7b-18af-4903-99ba-381693eef379")
            .then(function (value) { //If gets back a resolve promise (no error)
                reject(false);
            }).catch((error) => { //If gets back a reject promise (error)
                if (error === "Can't run Kheet on private games."){ resolve(true);}else{reject(error);}
            });

    });

}

async function testCheckInputInvalid() {

    return new Promise(function (resolve, reject) {

        checkInput("xyz")
            .then(function (value) { //If gets back a resolve promise (no error)
                reject(false);
            }).catch((error) => { //If gets back a reject promise (error)
                if (error === "Quiz not found, make sure the ID is correct.") { resolve(true); } else { reject(error); }
            });

    });

}

async function testParse() {
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

async function testBubbleCreation() {
    createBubble();
    expandBubble();
    return new Promise(function (resolve, reject) {
        if (GetElem("bubble") != null && GetElem("bubbleClone") != null) {
            closeBubble();
            resolve(true);
        } else { reject(false);}

    });
}

async function testMainPageCreation() {
    expandBubble();
    return new Promise(function (resolve, reject) {
        if (GetElem("infoBox") != null && GetElem("mainDiv") != null) {
            closeBubble();
            resolve(true);
        } else { reject(false); }

    });
}

async function testModesPageCreation() {
    expandBubble();
    viewModes();
    return new Promise(function (resolve, reject) {
        if (GetElem("IncognitoToggle") != null && GetElem("AutopilotToggle") != null) {
            closeBubble();
            resolve(true);
        } else { reject(false); }

    });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function TEST(func) {

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
}

async function GetElem(id) {
    return document.getElementById(id);
}

//////////      CALLING ALL TESTS       //////////
console.log("%c ========STARTING TESTS========\n", "color: Yellow;")
TEST(testCheckInput);
TEST(testParse);
TEST(testCheckInputPrivate);
TEST(testCheckInputInvalid);
TEST(testBubbleCreation);
TEST(testMainPageCreation);
TEST(testModesPageCreation);