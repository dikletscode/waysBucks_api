const { Product } = require("../../models");
const cloudinary = require("../config/cloudinary");

exports.createProducts = async (req, res) => {
  const { title, price } = req.body;
  if (req.user.role == 1) {
    try {
      let file = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
      });

      let data = await Product.create({
        title,
        price,
        image: file.secure_url,
        cloudId: file.public_id,
      });

      res.status(200).send({ product: data });
    } catch (error) {
      res.status(500).send({ error: { message: "an Error occurred" } });
    }
  } else {
    res
      .status(403)
      .send({ message: "you are not given permission to access this" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let data = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).send({ product: data });
  } catch (error) {
    console.log(error);
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
    res.status(200).send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.editProduct = async (req, res) => {
  let id = req.params.id;
  const { title, price } = req.body;
  if (req.user.role == 1) {
    try {
      let file = req.file
        ? await cloudinary.uploader.upload(req.file.path, {
            folder: "products",
            use_filename: true,
          })
        : null;

      const product = await Product.findByPk(id);
      await Product.update(
        {
          title: title,
          price: price,
          image: file ? file.secure_url : product.image,
          cloudId: file ? file.public_id : product.cloudId,
        },
        { where: { id: id } }
      );
      if (file) {
        await cloudinary.uploader.destroy(product.cloudId);
      }

      res.send({ product: "success" });
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

exports.deleteProduct = async (req, res) => {
  let id = req.params.id;
  if (req.user.role == 1) {
    try {
      let data = await Product.destroy({ where: { id: id } });
      await cloudinary.uploader.destroy(data.cloudId);

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
