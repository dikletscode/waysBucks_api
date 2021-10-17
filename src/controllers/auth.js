const { User, Profile } = require("../../models");
const redis = require("../config/redis");
const { createAccessToken } = require("../util/accessToken");
const { registerError } = require("../util/registerError");

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    await User.create(
      {
        email,
        password,
        profile: {
          fullname: fullname,
        },
      },
      {
        include: { model: Profile, as: "profile" },
      }
    );

    res.status(201).send({ message: "account created successfully!" });
  } catch (error) {
    registerError(error, res);
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
      attributes: ["id", "role", "email"],
      include: {
        model: Profile,
        as: "profile",
        attributes: ["image", "fullname"],
      },
    });
    const token = createAccessToken(dataClient);

    const data = {
      status: "success",
      token: token,
      user: dataClient,
    };

    res.status(201).send(data);
  } catch (err) {
    if (err.error == true || err instanceof TypeError) {
      res.status(401).json({
        message: "email or password are invalid",
        data: null,
      });
    } else {
      console.log(err);
      res.status(500).send({ message: "system is being repaired" });
    }
  }
};

exports.getUserForVerify = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "an error occured" });
  }
};
