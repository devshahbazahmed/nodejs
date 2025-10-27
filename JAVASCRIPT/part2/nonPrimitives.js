let username = {
  firstname: "Shahbaz",
  isLoggedIn: true,
  "new address": "Mumbai",
};

username.firstname = "Hitesh";
username.lastname = "Choudhary";

console.log(username.firstname);
console.log(username.lastname);
console.log(username);
console.log(username["new address"]);
console.log(typeof username);

let today = new Date();
console.log(today.getDate());

// Array

let heroes = ["ironman", "hulk", "spiderman"];

console.log(heroes[0]);

