var getArray = require('./getArray.js');
module.exports = function (data, str) {
    function isan(str) {
        return str.match(/[a-zA-Z0-9]/);
    }

    str = str.split('');
    var i = 0;
    var len = str.length;

    function string(match) {
        var s = [];
        var m = 0;
        var backslash = false;
        //s.push(match);

        for (++i; i < len; i++) {
            var char = str[i];
            if (char === "\\") backslash = true;
            else if (char === match && !backslash) {
                m = 1;
                break;
            } else if (backslash) {
                backslash = false;
            }
            s.push(char);
        }
        if (!m) throw 'Syntax Error: Expected end-of-string identifier (\' or ")'
        return s.join('');
    }
    var t = 0;
    for (; i < len; ++i) {

        var c = str[i];
        if (c === '$') {
            var a = [];
            for (++i; i < len; ++i) {
                if (!isan(str[i])) break;
                a.push(str[i]);
            }
            if (a.length === 0) throw 'Invalid variable with length 0';
            var v = Util.getVar(a.join(''));
            if (!v || !Util.varValid(data, v)) throw 'Unable to access undeclared variable'
            data.current.data.push({
                type: 'var',
                name: v
            });
        } else if (c === '+' || c === '-' || c === '*' || c === '/' || c === '%') {
            data.current.data.push({
                type: 'operator',
                operator: c
            });
        } else if (c === '\'' || c === '"') {
            var str = string(c);
            data.current.data.push({
                type: 'string',
                data: str
            });

        } else if (c === '(') {
            data.current.data.push({
                type: 'operator',
                operator: c
            });
            t++;
        } else if (c === ')') {
            data.current.data.push({
                type: 'operator',
                operator: c
            });
            t--;
        } else if (c.match(/[0-9.]/)) {
            var dec = (c === '.')
            var e = false;
            var s = c;
            for (++i; i < len; ++i) {
                if (!str[i].match(/[0-9]/)) {
                    if (str[i] === '.') {
                        if (dec) throw 'Syntax Error: Unexpected extra . on decimal'
                        dec = true;
                    } else if (str[i] === 'e') {
                        if (e) throw 'Syntax Error: Unexpected e'
                        e = true;
                    } else {
                        i--;
                        break;
                    };
                } else s += str[i];

            }
            data.current.data.push({
                type: 'number',
                number: s,
                decimal: dec,
                exp: e
            });
        } else if (c !== ' ') {
            throw 'Invalid operator ' + c;
        }
    }

    if (t !== 0) throw 'Syntax Error: Missing or extra parenthesis';

}
