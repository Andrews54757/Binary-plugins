module.exports = function (st, dt) {
    st = st.trim().split("");
    var it = [];

    function sep(str) {
        var ig = false;
        var es = false;
        var t = 0;
        var c = [];
        var r = [];
        for (var i = 0; i < str.length; i++) {
            if (str[i] == "\\" && !es) {
                es = true;
                c.push(str[i])
            } else
            if (str[i] == "\"" && !es) {
                c.push(str[i])
                ig = !ig
            } else if (str[i] == "[" && !ig) {
                if (t == 0) {
                    r.push(c.join(""))
                    c = [];
                } else
                    c.push("[")
                t++;
            } else if (str[i] == "]" && !ig) {
                t--;
                if (t != 0)
                    c.push("]")
            } else {
                es = false;
                c.push(str[i])
            }
        }
        if (c.length) r.push(c.join(""))
        return r;
    }

    function recurse(str, start) {
        var a = sep(str)
        var len = a.length - 1;
        var entry = 0;
        for (var i = 0; i < len; i++) {
            var c = a[len - i];
            if (isNaN(c)) { // not a number
                var g = c.indexOf("[") != -1
                if (len - i == 1) {
                    it.push(start) // output
                    it.push(g ? start : data.variables[c]) // input
                    it.push(data.variables[a[0]]) // table
                    it.push(20)
                    recurse(c, start)
                } else {
                    it.push(start) // output
                    it.push(g ? start + len - i - 1 : data.variables[c]) // input
                    it.push(start) // table
                    it.push(20)
                    recurse(c, start + len - i - 1)
                }
            } else {
                if (len - i == 1) {
                    it.push(start) // output
                    it.push(parseInt(c)) // input
                    it.push(data.variables[a[0]]) // table
                    it.push(10)
                } else {
                    it.push(start) // output
                    it.push(parseInt(c)) // input
                    it.push(data.variables[a[0]]) // table
                    it.push(10)
                }
            }
        }
    }
    recurse(st, data.index++);
    it.reverse();
    data.codes = data.codes.concat(it);
    return data.index - 1;
}