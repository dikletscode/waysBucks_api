const jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_KEY, {
    expiresIn: "10h",
  });
};
