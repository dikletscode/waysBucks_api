const { User } = require("../../models");

exports.register = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    await User.create({ fullname, email, password, role });
    res.status(201).send({ message: "account created successfully!" });
  } catch (error) {
    console.log(error);
    if (error.parent.code == "ER_DUP_ENTRY") {
      res.status(209).send({ message: "email has been used!" });
    } else {
      res.status(500).send({ message: "an error occured" });
    }
  }
};
