const { Buffer } = require("node:buffer");

// const buf = Buffer.alloc(4);
// console.log(buf[1]);

// const buf = Buffer.from("Hello chai");
// console.log(buf);
// console.log(buf.toString());

// const buffTwo = Buffer.allocUnsafe(110);
// console.log(buffTwo);

// const buf = Buffer.alloc(10);
// buf.write('Hello');
// console.log(buf.toString());

// const buf = Buffer.from("Chai aur Code");
// console.log(buf.toString());
// console.log(buf.toString('utf-8', 0, 4));

// const buf = Buffer.from("Chai");
// buf[0] = 0x4A;
// console.log(buf);
// console.log(buf.toString());

const buf1 = Buffer.from("Chai aur");
const buf2 = Buffer.from(" code");
const merged = Buffer.concat([buf1, buf2]);
console.log(merged.toString());
console.log(merged.length);