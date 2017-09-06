var getVariable = require('./getVariable.js')
module.exports = function (split, data, l) {

    var variables = [];

    split.slice(0, split.length - 1).forEach((st) => {
        if (st.charAt(0) === '$') {
            variables.push(st.substr(1));
        } else {
            var e = 'Syntax Error: Expected $ instead got '.st.charAt(0);
            throw e;
        }
    });


    variables.forEach((v, i) => {
        v = Util.getVar(v);
        if (!v) throw 'Syntax Error: Invalid variable.'
        data.current.variables[v] = 1;
        data.current.data.push({
            type: 'var',
            name: v,
        });
        if (i != 0)
            data.current.data.push({
                type: 'operator',
                operator: '=',
            });
    });

    var set = split[split.length - 1];
    getVariable(data, set);
}
