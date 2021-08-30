
// Collecting all of the files
                fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/script.js")
    .then((a) => a.text()
    .then((b) => fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/pageStyle.js")
    .then((c) => c.text()
    .then((d) => fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/GUI/GUI.js")
    .then((e) => e.text()
    .then((f) => fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/GUI/GUI.add.js")
    .then((g) => g.text()
    .then((h) => fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/GUI/GUI.view.js")
    .then((i) => i.text()
    .then((j) => allFiles = (b + d + f + h + j)))))))))));










/////
