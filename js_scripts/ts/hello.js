function greet(person, date) {
    console.log("hello, ".concat(person), date.toDateString());
}
greet('John', new Date());
function printArr(items) {
    var m = 6;
    items.forEach(function (s) { return console.log(s.toUpperCase()); });
    console.log(m);
}
printArr(['string', 'string1', 'string2']);
function returnArr(msg) {
    var result;
    result = msg.split(' ');
    return result;
}
console.log(returnArr('split me! please'));
function optionalArgs(required, required2, canBeEmpty, canBeEmpty2) {
    var result = '';
    result = "".concat(required.length, " + ").concat(required2, " + ").concat(canBeEmpty, " + ").concat(canBeEmpty2);
    return result;
}
console.log(optionalArgs('only', 1), optionalArgs('all', 1, 2, 'all'));
function myTypePrint(m) {
    console.log(m.s);
    console.log(m.x);
}
myTypePrint({ s: 'sad', x: 5 });
function sanitaze(s) {
    return s.replace('/[ ]/m', '_');
}
console.log(sanitaze('ksadas erwg sd 2314 ax zxfas'));
var person_user = {
    Name: 'Me',
    Age: 49
};
console.log(person_user);
var admin_user = {
    Name: 'dispatch',
    Age: 0,
    Policies: [
        'all',
        '*'
    ]
};
console.log(admin_user);
var assert = '1';
var assert2 = assert;
console.log(assert2);
