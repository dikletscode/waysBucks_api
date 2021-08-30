const { Product, Topping } = require("../../models");

exports.createTopping = async (req, res) => {
  const { title, price, images } = req.body;

  try {
    let data = await Topping.create({ title, price, images });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.send("error");
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
    res.send("error");
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
    res.send("error");
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
    res.send("error");
  }
};

exports.deleteTopping = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Topping.destroy({ where: { id: id } });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
