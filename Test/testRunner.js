fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/src/Run.js")
    .then((a) => a.text()
        .then((b) => eval(b)
            .then((d) =>
                fetch("https://raw.githubusercontent.com/EShrestha/kaheet/main/Test/test.js")
                    .then((e) => e.text()
                        .then((f) => eval(d + f))))));