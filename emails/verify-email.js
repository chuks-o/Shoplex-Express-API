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

class VerifyEmail {
  constructor(payload, mailOptions) {
    this.payload = payload;
    this.mailOptions = mailOptions;
  }

  generate() {
    const { actionLink, user } = this.payload;
    const email = {
      body: {
        greeting: "Dear",
        name: user.firstname,
        intro:
          "Welcome to Shoplex NG, You are one step from beginning your journey with us.",
        action: {
          instructions: "Please click the button below to verify your account",
          button: {
            color: "#00bdaa",
            text: "Verify account",
            // link: "http://example.com/verify_account",
            link: actionLink,
          },
        },
      },
    };

    const emailTemplate = mailGenerator.generate(email);
    return emailTemplate;
  }
}

// const emailTemplate = mailGenerator.generate(email);
// require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

module.exports = VerifyEmail;
