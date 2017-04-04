function read(codes, calls) {
    var index = 0,
        memory = [],
        callcache = [],
        strings = [].fill(0, 0, 255);


    for (index = 0; index < codes.length; index++) {

        var current = codes[index],
            next = codes[index + 1],
            next2 = codes[index + 2],
            next3 = codes[index + 3],
            next4 = codes[index + 4]
        switch (current) {
        case 0: // set
            memory[next] = next2
            break;
        case 1: // getset
            memory[next] = memory[next2]
            if (strings[next2]) strings[next] = 1;
            else strings[next] = 0;
            break;
        case 2: // goto
            index = next;
            break;
        case 3: // add
            memory[next3] = memory[next] + memory[next2]
            break;
        case 4: // subtract
            memory[next3] = memory[next] - memory[next2]
            break;
        case 5: // multiply
            memory[next3] = memory[next] * memory[next2]
            break;
        case 6: // divide
            memory[next3] = memory[next] / memory[next2]
            break;
        case 7: // if
            var value = false;
            switch (next) {
            case 0: // equal to
                value = next2 == next3
                break;
            case 1: // bigger than
                value = next2 > next3
                break;
            case 2: // bigger than or equal
                value = next2 >= next3
                break;
            case 3: // smaller than
                value = next2 < next3
                break;
            case 4: // smaller than or equal
                value = next2 <= next3
                break;
            }

            if (!value) index = next4;
            break;
        case 8: // array
            memory[next] = [];
            strings[next] = [];
            break;
        case 9: // setarray
            memory[next][next2] = next3;
            strings[next][next2] = 0;
            break;
        case 17: // setarray2
            memory[next][next2] = memory[next3];
            strings[next][next2] = strings[next3];
            break;
        case 18: // setarray3
            memory[next][memory[next2]] = next3;
            strings[next][next2] = 0;
            break;
        case 19: // setarray4
            memory[next][memory[next2]] = memory[next3];
            strings[next][memory[next2]] = strings[next3];
            break;
        case 10: // getarray
            memory[next3] = memory[next][next2];
            strings[next3] = strings[next][next2];
            break;
        case 20: // getarray2
            memory[next3] = memory[next][memory[next2]];
            strings[next3] = strings[next][memory[next2]];
            break;
        case 11: // delarray
            delete memory[next][next2];
            break;
        case 12: // string

            memory[next] = [];
            strings[next] = 1;
            for (index += 2; index < codes.length; index++) {
                if (!codes[index]) break;
                memory[next].push(codes[index]);

            }
            break;
        case 13: // concatarray
            memory[next3] = memory[next].concat(memory[next2])
            break;
        case 14: // len
            memory[next2] = memory[next].length
            break;
        case 15: // run

            var str = stringify(memory[next])
            var c = calls;
            if (callcache[str]) {
                c = callcache[str];
            } else {
                var split = str.split(".")
                for (var i = 0; i < split.length; i++) {
                    c = c[split[i]]

                }
                callcache[str] = c;
            }
            var args = [];
            for (index += 2; index < codes.length; index++) {
                if (!codes[index]) break;
                if (strings[codes[index]]) {
                    args.push(stringify(memory[codes[index]]));
                } else {
                    args.push(memory[codes[index]]);
                }
            }
            var result = false;
            switch (args.length) {
            case 1:
                result = c(args[0])
                break;
            case 2:
                result = c(args[0], args[1])
                break;
            case 3:
                result = c(args[0], args[1], args[2])
                break;
            case 4:
                result = c(args[0], args[1], args[2], args[3])
                break;
            case 5:
                result = c(args[0], args[1], args[2], args[3], args[4])
                break;
            case 6:
                result = c(args[0], args[1], args[2], args[3], args[4], args[5])
                break;
            case 7:
                result = c(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
                break;
            case 8:
                result = c(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])
                break;
            case 9:
                result = c(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8])
                break;
            case 10:
                result = c(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
                break;
            }
            if (codes[index + 1]) {
                memory[codes[index + 1]] = result;
            }
            index++;
            break;
        case 16: // power
            memory[next3] = Math.pow(memory[next], memory[next2]);
            break;
        case 17: // root
            memory[next3] = Math.pow(memory[next], 1 / memory[next2]);
            break;

        }


    }



    function stringify(arr) {
        var str = [];
        for (var i = 0; i < arr.length; i++) {
            str.push(String.fromCharCode(arr[i]))
        }
        return str.join("")

    }


}
var c = {};
c["console"] = console;
read([12, 1, 104, 101, 108, 108, 111, 0, 12, 2, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 0, 15, 2, 1, 0, 0], c)