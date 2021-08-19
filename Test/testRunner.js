
async function init() {
    let file1 = await fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/script.js");
    let file2 = await fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/Test/test.js");

    return (file1 + file2);
}

init();

// script.js 
// test.js