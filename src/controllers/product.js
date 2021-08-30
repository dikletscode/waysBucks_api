const { Product } = require("../../models");

exports.createProducts = async (req, res) => {
  const { title, price, images } = req.body;

  try {
    let data = await Product.create({ title, price, images });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

exports.getProducts = async (req, res) => {
  try {
    let data = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.send("error");
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
    res.send("error");
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
    console.log(error);
    res.send("error");
  }
};

exports.deleteProduct = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Product.destroy({ where: { id: id } });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
