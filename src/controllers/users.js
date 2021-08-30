const { User } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["id", "fullname", "email", "images"],
    });
    res.status(201).send({ users: users });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: { message: "error" } });
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
    res.status(400).send({ error: { message: "error" } });
  }
};
