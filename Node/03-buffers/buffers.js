const { Buffer } = require("node:buffer");

const buf = Buffer.alloc(4);
console.log(buf[1]);

const buf8 = Buffer.from("Hello Chai");
console.log(buf8);
console.log(buf8.toString());

const bufTwo = Buffer.allocUnsafe(10);
console.log(bufTwo);

const buf3 = Buffer.alloc(10);
buf3.write("hello");
console.log(buf3.toString());

const buf4 = Buffer.from("Chai aur Code");
console.log(buf4.toString());
console.log(buf4.toString("utf-8", 0, 4));

const buf5 = Buffer.from("Chai");
console.log(buf5);
buf5[0] = 0x4a;
console.log(buf5);
console.log(buf5.toString());

const buf6 = Buffer.from("Chai aur");
const buf7 = Buffer.from(" code");
const merged = Buffer.concat([buf6, buf7]);
console.log(merged.toString());
console.log(merged.length);
