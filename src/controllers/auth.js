const { User, Profile } = require("../../models");

const createAccessToken = require("../util/accessToken");

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
    console.log(error);
    if (error.parent.code == "ER_DUP_ENTRY") {
      res.status(409).send({ message: "email has been used!" });
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
      attributes: ["id", "role", "email"],
      include: {
        model: Profile,
        as: "profile",
        attributes: ["image", "fullname"],
      },
    });
    const data = {
      status: "success",
      token: createAccessToken(dataClient),
      user: {
        id: dataClient.id,
        role: dataClient.role,
        image: dataClient.profile.image,
        email: dataClient.email,
        fullname: dataClient.profile.fullname,
      },
    };

    res.status(201).send(data);
  } catch (err) {
    if (err.error == true) {
      res
        .status(401)
        .json({ message: "email or password are invalid", data: null });
    } else if (err instanceof TypeError) {
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
