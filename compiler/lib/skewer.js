module.exports = function (str) {

    str = str.split("");
    var len = str.length;
    var out = [];
    var i = 0



    function skip(match) {

        var backslash = false;
        out.push(match);

        for (++i; i < len; i++) {
            char = str[i];
            out.push(char);
            if (char === "\\") backslash = true;
            else if (char === match && !backslash) {
                break;
            } else if (backslash) {
                backslash = false;
            }
        }
    }
    for (; i < len; i++) {
        var char = str[i];

        if (char == "\"") {
            skip("\"");
        } else if (char == "'") {
            skip("'");
        } else if (char == "/") {
            i++
            if (str[i] == "/") {
                for (++i; i < len; i++) {
                    var c = str[i];
                    if (c == "\n") {
                        out.push("\n")
                        break;
                    }
                }

            } else if (str[i] == "*") {

                var star = false;
                for (++i; i < len; i++) {
                    var c = str[i];
                    if (c == "*") {
                        star = true;
                    } else
                    if (c == "/" && star) {
                        break;
                    } else if (star) {
                        star = false;
                    }
                }
            }
        } else if (char == ' ') {
            for (; i < len; i++) {
                if (str[i + 1] != " ") break;
            }
            out.push(" ");
        } else if (char == '\n') {
            for (; i < len; i++) {
                if (str[i + 1] != " " && str[i + 1] != "\n") break;
            }
            out.push("\n");
        } else {
            out.push(char)
        }

    }
    return out.join('');
}
