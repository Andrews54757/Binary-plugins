function sep(str) { // split based on parenthesis
    var t = 0;
    var c = [];
    var r = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] == "(") {
            if (t == 0) {
                r.push(c.join(""))
                c = [];
            }
            c.push("(")
            t++;
        } else if (str[i] == ")") {
            t--;
        }

        c.push(str[i])

    }
    if (c.length) r.push(c.join(""))
    return r;
}

function fractionise(number) {
    var numerator = 1.0;
    var denominator = 1.0;
    if (number === 0.0) { //edge case
        return "0/1";
    }
    while (numerator / denominator !== number) {
        if (numerator / denominator < number) {
            numerator++;
            denominator--;
        } else if (numerator / denominator > number) {
            denominator++;
        }
    }
    return [numerator, denominator];
}
str = str.replace(/\s/g, "")

function solve(str, start) {
    var a = sep(str);
    for (var i = 0; i < a.length; i++) {
        var c = a[i]
        if (c.charAt(0) == "(") { // paren
            c = c.slice(1)
        } else {

        }
    }
}