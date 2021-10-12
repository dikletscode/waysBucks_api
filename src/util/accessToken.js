const jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_TOKEN, {
    expiresIn: "10h",
  });
};
