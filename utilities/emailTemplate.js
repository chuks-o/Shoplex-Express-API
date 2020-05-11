const MailGen = require("mailgen");

const mailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "Shoplex NG",
    link: "http://shoplex.ng",
    copyright: "Copyright © 2020 Shoplex NG. All rights reserved.",
    // logo: your app logo url
  },
});

const email = {
  body: {
    greeting: "Dear",
    name: "Okpala Chukwualasu",
    intro:
      "Welcome to Shoplex NG, Your one-stop marketplace for genuine products and sellers.",
    action: {
      instructions: "Please click the button below to verify your account",
      button: {
        color: "#00bdaa",
        text: "Verify account",
        link: "http://example.com/verify_account",
      },
    },
  },
};

const emailTemplate = mailGenerator.generate(email);
require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

module.exports = emailTemplate;
