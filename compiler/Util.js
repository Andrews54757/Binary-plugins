module.exports = {
    splitSafe: function (str, spl) { // splits a string safely
        spl = spl.split('');
        str = str.split("");
        var results = [];
        var current = [];
        var i = 0;
        var len = str.length;

        function skip(match) {

            var backslash = false;
            current.push(match);

            for (++i; i < len; i++) {
                var char = str[i];
                current.push(char);
                if (char === "\\") backslash = true;
                else if (char === match && !backslash) {
                    break;
                } else if (backslash) {
                    backslash = false;
                }
            }
        }

        for (; i < len; ++i) {
            if (str[i] === '"') {
                skip('"');
            } else if (str[i] === "'") {
                skip("'");
            } else {
                if (spl.every((char, j) => {
                        if (str[i + j] === char) return true;
                        return false;
                    })) {

                    i += spl.length - 1;
                    results.push(current.join(''));
                    current = [];
                } else
                    current.push(str[i]);
            }
        }

        results.push(current.join(''));
        return results;
    },
    getVar: function (v) {

        return v.match(/[a-zA-Z]+[0-9]*/)[0];
    },
    varValid: function (data, v) {
        while (data) {
            if (data.variables[v]) return true;
            data = data.parent;
        }
        return false;
    },

}
