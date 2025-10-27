// words vs keywords

// var, let, const - line-by-line comparison

// var username = "harsh";

// declaration and initialization

// var a; // declaration

// var a = 12; // declare and initialize - give a variable it's first value

// var - window mein add hota hai
// function scoped hota hai
// aap firse declare kar sakte ho same name se and error nahi aayega

// Cannot declare `let` with the same name again

// `const` is for constant value - cannot change it

// Scope (global, block, functional)

// global scope - poore code mein access kar sakte hai
// function scope - function k andar access kar sakte hai
// block scope - curly brace k andar access kar sakte hai

// Reassignment, Redeclaration

// var a = 12;
// a = 32;

// Redeclare - only possible with `var`
// var a = 32;
// a = 46;

// let b = 46;
// b = 56;

// var - can be reassigned and redeclared
// let - can be reassigned but cannot be redeclared
// const - cannot be reassigned nor redeclared

// Temporal Dead Zone - TDZ

// tdz - utna area jitne mein js ko pata toh hai ki variable exist karta hai par wo aapko value nahi de sakta

// console.log(a);

// let a = 12;

// Hoisting impact per type

// hoisting -> ek variable ko jab js mein banate hain to wo variable do parts mein toot jaata hai and uska declare part upar chala jaata hai and uska initialization part neeche reh jaata hai.

// var -> hoist -> undefined
// let -> hoist -> X
// const -> hoist -> X

// var a = 12;