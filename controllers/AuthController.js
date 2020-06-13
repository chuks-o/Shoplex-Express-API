const models = require("../database/models");
const { User, Profile } = models;
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../utilities/authUtils");
const mailer = require("../utilities/mailer.js");
const { ErrorHandler } = require("../utilities/errorHandler");

module.exports = {
  signup: async (req, res, next) => {
    try {
      let { firstname, lastname, email, password, phone } = req.body;
      // Check if user exists
      const userExists = await User.findAll({
        where: { email: req.body.email },
      });

      if (userExists.length > 0) {
        throw new ErrorHandler(401, "User already exists, proceed to login");
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

            // const mailOptions = {
            //   from: '"Shoplex Team" <info@shoplex.ng>',
            //   to: newUser.email,
            //   subject: "Verify Your Email Address",
            //   // html: emailTemplate,
            // };

            // mailer.sendMail(
            //   { type: "verify_email" }, // email type
            //   { user: newUser, actionLink: "localhost:9000/login" }, // mail body payload
            //   mailOptions
            // );

            return res.status(201).json({
              success: true,
              code: 201,
              message: "Signup successful",
              data: { user: newUser },
            });
          }
        });
      }
    } catch (error) {
      next(error);
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
        throw new ErrorHandler(400, "Incorrect Login details");
      } else {
        // Generate jwt token
        const jwtToken = await generateJWTToken(req.body);
        delete user.password;

        return res.status(200).json({
          success: true,
          code: 200,
          message: "Auth successful",
          data: { user },
          token: jwtToken,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
