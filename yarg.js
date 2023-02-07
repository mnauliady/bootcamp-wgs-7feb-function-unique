const yargs = require("yargs");
// console.log(yargs.argv);
const fs = require("fs");
const validator = require("validator");
const contacts = require("./contact.js");

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      describe: "mobile phone number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile,
    };
    // console.log(contact);
  },
});
const data = yargs.parse();

const main = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);
  const cek = myData.find((x) => x.name.toLowerCase() === data.name.toLowerCase());
  if (cek) {
    console.log("Nama sudah ada");
  } else {
    if (!validator.isMobilePhone(data.mobile, "id-ID")) {
      console.log("Format telephone tidak sesuai");
    } else {
      // jika email tidak kosong
      if (data.email != null) {
        // validasi email (jika tidak sesuai)
        if (!validator.isEmail(data.email)) {
          console.log("Format email tidak sesuai");
        } else {
          // jika email sesuai
          contacts.saveContact(data.name, data.email, data.mobile);
        }
      } else {
        // jika email kosong
        contacts.saveContact(data.name, data.email, data.mobile);
      }
    }
  }
};

main();
