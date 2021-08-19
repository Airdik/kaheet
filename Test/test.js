console.log("TEST");
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
