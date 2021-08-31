const { User } = require("../../models");
const createAccessToken = require("../util/accessToken");

exports.register = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    await User.create({ fullname, email, password, role });
    res.status(201).send({ message: "account created successfully!" });
  } catch (error) {
    if (error.parent.code == "ER_DUP_ENTRY") {
      res.status(209).send({ message: "email has been used!" });
    } else {
      res.status(500).send({ message: "an error occured" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pswInDb = await User.findOne({
      where: { email: email },
      attributes: ["password"],
    });
    await User.auth(password, pswInDb.password);
    const dataClient = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.status(201).send({
      message: "login success",
      data: { user: dataClient, token: createAccessToken(dataClient) },
    });
  } catch (err) {
    if (err.error == true || err instanceof TypeError) {
      res
        .status(401)
        .json({ msg: "email, password or both are invalid", data: null });
    } else {
      res.status(500).send({ error: { message: "an error onccured" } });
    }
  }
};
