const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("this is resolved data");
    reject("this is a rejection!");
  }, 1500);
});

console.log("before");

promise
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

console.log("after");
