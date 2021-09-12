const { User, Profile } = require("../../models");
const cloudinary = require("../config/cloudinary");
exports.getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["id", "fullname", "email", "images"],
    });
    res.status(201).send({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let users = await User.findOne({
      where: { id: req.user.id },
      attributes: ["email"],
      include: { model: Profile, as: "profile" },
    });
    console.log(req.user.id, users);
    res.status(201).send({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
exports.updateProfile = async (req, res) => {
  const { fullname } = req.body;

  try {
    if (req.file) {
      let file = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
        use_filename: true,
      });
      let users = await Profile.update(
        {
          fullname: fullname,
          image: file.secure_url,
        },
        { where: { userId: req.user.id } }
      );
      let newData = await User.findOne({
        where: { id: req.user.id },
        attributes: ["email"],
        include: { model: Profile, as: "profile" },
      });
      console.log(users);
      res.status(201).send({ users: newData });
    } else {
      res.status(422).send({ message: "can not be empty" });
    }
  } catch (error) {
    res.status(500).send({ message: error ? error : "an Error occurred" });
  }
};

exports.deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    let users = await User.destroy({
      where: { id: id },
    });

    res.status(201).send({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
