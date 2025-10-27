// Number

let balance = 120;
let anotherBalance = new Number(200);

// console.log(balance);
// console.log(anotherBalance.valueOf());

// console.log(typeof balance);
// console.log(typeof anotherBalance);

// Boolean
let isActive = true;
let isReallyActive = new Boolean(true); // not recommended

// null and undefined
let firstname = null;
let lastname = undefined;
// console.log(firstname);
// console.log(lastname);

// String

let myString = "hello";
let myStringOne = 'hola';
let username = 'Shahbaz';

let oldGreet = myString + ' hitesh';
console.log(oldGreet);

let greetMessage = `Hello ${username}`;
let demoOne = `Value is ${2 + 2}`;
// console.log(demoOne);


let sm1 = Symbol("hitesh");
let sm2 = Symbol("hitesh");

console.log(sm1 == sm2);