const { Product, Topping } = require("../../models");
const cloudinary = require("../config/cloudinary");

exports.createTopping = async (req, res) => {
  const { title, price, images } = req.body;
  try {
    let image = req.file.filename;

    let url = await cloudinary.uploader.upload(req.file.path, {
      folder: "toppings",
      use_filename: true,
    });

    let data = await Topping.create({ title, price, image: image });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getToppins = async (req, res) => {
  try {
    let data = await Topping.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getDetailTopping = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Topping.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.editTopping = async (req, res) => {
  let id = req.params.id;
  const { title, price, image } = req.body;
  try {
    let data = await Topping.update(
      {
        title: title,
        price: price,
        image: image,
      },
      { where: { id: id } }
    );
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.deleteTopping = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Topping.destroy({ where: { id: id } });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
