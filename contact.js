const fs = require("fs");
const path = "./data";
const pathFile = "./data/contacts.json";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
  console.log("Success create folder");
}

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, "[]", "utf-8");
  console.log("Success create file");
}

const input = (data) => {
  return new Promise(function (resolve, reject) {
    readline.question(data, (ans) => {
      // console.log(ans);
      resolve(ans);
    });
  });
};

const saveContact = (name, email, telephone) => {
  const myObj = { name: name, email: email, telephone: telephone };
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);
  myData.push(myObj);
  const content = JSON.stringify(myData);
  fs.writeFileSync("./data/contacts.json", content);
  readline.close();
};

module.exports = { input, saveContact };
