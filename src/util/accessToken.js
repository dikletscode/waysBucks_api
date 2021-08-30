const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_TOKEN);
};

module.exports = createAccessToken;
