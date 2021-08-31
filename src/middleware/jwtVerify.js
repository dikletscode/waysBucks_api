const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const headers = req.headers;
  const auth = headers.authorization;
  //   console.log(auth);
  if (auth) {
    const token = auth && auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Forbidden");
      }
      console.log(decode);
      req.user = decode;
      next();
    });
  } else {
    res.status(401).send("u can't access,not authenticated");
  }
};
module.exports = jwtVerify;
