var jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  generateJWTToken: async userData => {
    const expiresIn = { expiresIn: 86400 };
    return await jwt.sign(userData, SECRET_KEY, expiresIn);
  },

  verifyToken: (req, res, next) => {
    try {
      if (req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization.split(" ")[1];
        const expiresIn = { expiresIn: 86400 };
        if (!token) {
          return res
            .status(401)
            .json({ status: "error", code: 401, message: "Unauthorized" });
        }
        if (jwt.verify(token, SECRET_KEY, expiresIn)) next();
      } else {
        return res
          .status(401)
          .json({ status: "error", code: 401, message: "Unauthorized" });
      }
    } catch (e) {
      return res.status(401).json(e);
    }
  }
};
