// Object destructuring

// const person = {
//   // name: "Lump",
//   age: 67,
//   location: {
//     city: "Ladytown",
//     temp: 99
//   }
// };

// const { name: firstName = "Anonymous", age } = person;
// const { temp: temperature, city } = person.location;

// console.log(`${firstName} is ${age}`);

// if (temperature && city) {
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title: "Three-Body Problem",
//   author: "Cixin Liu",
//   publisher: {
//     // name: "Penguin"
//   }
// };

// const { name: publisherName = "self published" } = book.publisher;

// console.log(publisherName);

// Array destructuring

// const address = ["123 Lacey Oak", "San Antonio", "TX", "78209"];

// const [, city, state = "NY"] = address;

// console.log(`You are in ${city}, ${state}`);

const item = ["coffee", "$2.00", "$2.50", "$2.75"];

const [product, , medium] = item;

console.log(`A medium ${product} costs ${medium}`);
