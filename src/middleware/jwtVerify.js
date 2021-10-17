const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const headers = req.headers;
  const auth = headers.authorization;
  //   console.log(auth);
  if (auth) {
    const token = auth && auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError"
            ? { message: "unauthorized", code: "401" }
            : { message: "expired", code: "403" };
        console.log(err);
        return res.status(403).json(message);
      }

      req.user = decode;
      return next();
    });
  } else {
    return res.status(401).send("u can't access,not authenticated");
  }
};
module.exports = jwtVerify;
