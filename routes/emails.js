const { Router } = require("express");
const { verifyToken } = require("../utilities/authUtils");
const router = Router();
const { sendCustomMail } = require("../utilities/emails");
const emailTemplate = require("../utilities/emailTemplate");

router.post("/test", verifyToken, (req, res, next) => {
  let mailOptions = {
    from: '"Shoplex Team" <from@example.com>',
    to: "user1@example.com, user2@example.com",
    subject: "Verify Email Address",
    html: emailTemplate,
  };

  try {
    const mail = sendCustomMail(mailOptions);

    if (mail) {
      return res.status(200).send({
        status: "ok",
        code: 200,
        message: "Mail was sent successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
