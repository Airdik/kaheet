

fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/script.js")
    .then((r) => r.text()
        .then((t) =>
            fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/Test/test.js")
                .then((r2) => r2.text()
                    .then((t2) => allFiles = (t + t2)))));




fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/Test/testRunner.js")
    .then((r) => r.text()
        .then((t) => eval(t)
            .then((y) => eval(y))))