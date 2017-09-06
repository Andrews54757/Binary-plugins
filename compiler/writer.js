Util = require('./Util.js');
var skewer = require('./lib/skewer.js');
var setVariable = require('./lib/setVariable.js');
var fs = require('fs');

function write(str) {

    str = skewer(str);
    var lines = str.split("\n");
    var data = {
        varMap: [],
        index: 1,
        data: {
            variables: {},
            parent: null,
            scope: 0,
            data: []
        }
    }
    data.current = data.data;

    lines.forEach((line, i) => {
        if (!line) return;
        var arr = line.split('');
        var arr2 = line.split(' ');
        if (arr[0] === '$' && arr2[1] === '=') {
            var s = Util.splitSafe(line, ' = ');
            setVariable(s, data);
        }
    });

    return data.data;

}

var code = fs.readFileSync(__dirname + '/../example.bajs', 'utf8');

console.log(JSON.stringify(write(code), null, 4));
