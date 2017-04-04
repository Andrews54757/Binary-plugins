module.exports = {
    splitSafe: function (str, char) { // splits a string safely
        var results = [];
        var ig = false;
        var es = false;
        str = str.split("")
        var c = [];
        for (var i = 0; i < str.length; i++) {
            if (str[i] == "\\" && !es) {
                es = true;
                c.push(str[i]);
            } else
            if (str[i] == "\"" && !es) {
                c.push(str[i]);
                ig = !ig
            } else if (str[i] == char && !ig) {

                results.push(c.join(""));
                c = [];
            } else {
                c.push(str[i]);
                es = false;
            }

        }
        if (c.length) results.push(c.join(""));
        return results;
    }
}