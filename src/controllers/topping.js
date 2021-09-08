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
      });
      res.send({ product: data });
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
    res.send({ product: data });
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
