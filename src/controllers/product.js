const { Product } = require("../../models");
const cloudinary = require("../config/cloudinary");

exports.createProducts = async (req, res) => {
  const { title, price } = req.body;
  try {
    let file = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      use_filename: true,
    });

    let data = await Product.create({ title, price, image: file.secure_url });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let data = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send({ product: data });
  } catch (error) {
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getDetailProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Product.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.editProduct = async (req, res) => {
  let id = req.params.id;
  const { title, price, image } = req.body;
  try {
    let data = await Product.update(
      {
        title: title,
        price: price,
        image: image,
      },
      { where: { id: id } }
    );
    res.send({ product: data });
  } catch (error) {
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.deleteProduct = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Product.destroy({ where: { id: id } });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
