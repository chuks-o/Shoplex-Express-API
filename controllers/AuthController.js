const models = require("../database/models");
const { User, Profile } = models;
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../utilities/authUtils");
const mailer = require("../utilities/mailer.js");

module.exports = {
  signup: async (req, res, next) => {
    try {
      let { firstname, lastname, email, password, phone } = req.body;
      // Check if user exists
      const userExists = await User.findAll({
        where: { email: req.body.email },
      });

      if (userExists.length > 0) {
        return res.status(401).json({
          success: false,
          code: 401,
          message: "User already exists, proceed to login",
        });
      } else {
        // hash password and save user
        bcrypt.hash(password, 10, async (err, hash) => {
          const user = await User.create({
            lastname,
            firstname,
            email,
            password: hash,
          });
          // create the user profile
          const profile = await Profile.create({
            userId: user.id,
            phone,
          });

          if (user && profile) {
            const newUser = await User.findOne({
              where: { id: user.id },
              include: { model: Profile, as: "profile" },
            });

            const mailOptions = {
              from: '"Shoplex Team" <info@shoplex.ng>',
              to: newUser.email,
              subject: "Verify Your Email Address",
              // html: emailTemplate,
            };

            mailer.sendMail(
              { type: "verify_email" }, // email type
              { user: newUser, actionLink: "localhost:9000/login" }, // mail body payload
              mailOptions
            );

            return res.status(201).json({
              success: true,
              code: 201,
              data: { user: newUser },
            });
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: 500,
        error: error.message,
      });
    }
  },

  signin: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({
          success: true,
          code: 400,
          message: "Sorry, this user was not found.",
        });
      }
      // compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: "Incorrect login details.",
        });
      } else {
        // Generate jwt token
        const jwtToken = await generateJWTToken(req.body);
        delete user.password;

        return res.status(200).json({
          success: true,
          code: 200,
          data: { user },
          token: jwtToken,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
