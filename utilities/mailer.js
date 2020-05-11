const transport = require("../utilities/emails");
const VerifyEmail = require("../emails/verify-email");

const emailNotifications = {
  verify_email: VerifyEmail,
};

const sendMail = (notification, payload, mailOptions) => {
  const { type } = notification;

  // Generate the template with the right data
  const htmlTemplate = new emailNotifications[type](
    payload,
    mailOptions
  ).generate();

  // Add the html template
  const completeMailOptions = { ...mailOptions, html: htmlTemplate };

  // Send mail by invoking the nodemailer transport
  transport.sendMail(completeMailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendMail;
