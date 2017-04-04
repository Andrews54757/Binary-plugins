function write(str) {
    var lines = str.split("\n");
    var data = {
        functions: [],
        variables: [],
        reserved: ["function", "run", "=", "for", "while", ".", "\"", "->"],
        index: 1,
        codes: []
    }




    for (var index = 0; index < lines.length; index++) {
        var line = lines[index];

        if (line.indexOf("=") != -1) { // variable


        } else { // something else;
            var split = splitSafe(line, " ");
            switch (split[0]) {

            }
        }
    }

    function addString(str, st) {

        codes.push(12)
        codes.push(st)
        str.split("").forEach(function (a) {
            codes.push(a.charCodeAt(0));
        })
        codes.push(0)

    }

    getNumerical(st) {
        st = st.replace(/\s/g, "").split(" ");

        var current = [];

        for (var i = 0; i < st.length; i++) {

        }
    }
}

console.log(write('lol = "hello"\nrun "console.log" lol').toString())