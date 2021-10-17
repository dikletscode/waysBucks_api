const { Product, Topping } = require("../../models");
const cloudinary = require("../config/cloudinary");

exports.createTopping = async (req, res) => {
  const { title, price } = req.body;
  if (req.user.role == 1) {
    try {
      let imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "toppings",
        use_filename: true,
      });

      let data = await Topping.create({
        title,
        price,
        image: imageUrl.secure_url,
        cloudId: imageUrl.public_id,
      });

      res.status(201).send({ product: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: { message: "an Error occurred" } });
    }
  } else {
    res
      .status(403)
      .send({ message: "you are not given permission to access this" });
  }
};

exports.getToppings = async (req, res) => {
  try {
    let data = await Topping.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "an Error occurred" });
  }
};

exports.getDetailTopping = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Topping.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.editTopping = async (req, res) => {
  let id = req.params.id;
  const { title, price } = req.body;
  try {
    const topping = await Topping.findByPk(id);

    const file = req.file
      ? await cloudinary.uploader.upload(req.file.path, {
          folder: "toppings",
          use_filename: true,
        })
      : null;
    let data = await Topping.update(
      {
        title: title,
        price: price,
        image: file ? file.secure_url : topping.image,
        cloudId: file ? file.public_id : topping.cloudId,
      },
      { where: { id: id } }
    );

    if (file && topping.cloudId != null) {
      await cloudinary.uploader.destroy(topping.cloudId);
    }

    res.status(200).send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.deleteTopping = async (req, res) => {
  let id = req.params.id;

  try {
    let topping = await Topping.findByPk(id);
    let data = await Topping.destroy({ where: { id: id } });

    await cloudinary.uploader.destroy(topping.cloudId);
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
