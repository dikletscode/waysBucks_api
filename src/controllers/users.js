const { User, Profile } = require("../../models");
const cloudinary = require("../config/cloudinary");

exports.getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["id", "email", "role"],
      include: { model: Profile, as: "profile" },
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
      attributes: ["email", "createdAt"],
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
    let profile = await Profile.findOne({ where: { userId: req.user.id } });
    let file = req.file
      ? await cloudinary.uploader.upload(req.file.path, {
          folder: "users",
          use_filename: true,
        })
      : null;
    await Profile.update(
      {
        fullname: fullname || profile.fullname,
        image: file ? file.secure_url : profile.image,
        cloudId: file ? file.public_id : profile.cloudId,
      },
      { where: { userId: req.user.id } }
    );
    if (file && profile.cloudId) {
      await cloudinary.uploader.destroy(profile.cloudId);
    }
    let newData = await User.findOne({
      where: { id: req.user.id },
      attributes: ["email"],
      include: { model: Profile, as: "profile" },
    });

    res.status(201).send({ users: newData });
  } catch (error) {
    console.log(error);
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
