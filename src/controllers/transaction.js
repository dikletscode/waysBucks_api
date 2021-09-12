const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary");

const {
  Transaction,
  OrderUser,
  Topping,
  Product,
  Cart,
  User,
  History,
} = require("../../models");

exports.transaction = async (req, res) => {
  const { fullname, email, phone, postCode, totalPrice, address } = req.body;

  try {
    let arrs = [];
    let order = await Cart.findAll({ where: { userId: req.user.id } });
    let file = await cloudinary.uploader.upload(req.file.path, {
      folder: "attachment",
      use_filename: true,
    });
    await Transaction.create(
      {
        userId: req.user.id,
        status: "Waiting Approve",
        attachment: file.secure_url,
        orderUser: {
          fullname: fullname,
          email: email,
          phone: phone,
          postCode: postCode,
          address: address,
        },
        totalPrice: totalPrice,
        history: order,
      },
      {
        include: [
          { model: OrderUser, as: "orderUser" },
          { model: History, as: "history" },
        ],
      }
    );

    // console.log(order);
    order.map(async (item) => {
      await await Cart.destroy({ where: { id: item.id } });
    });
    res.status(200).send({ transaction: order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getHistory = async (req, res) => {
  try {
    let data = await Transaction.findAll({
      where: { userId: req.user.id },
      attributes: ["status", "totalPrice", "attachment", "updatedAt"],

      include: [
        {
          model: History,
          as: "history",
          attributes: { exclude: ["userId"] },

          include: [
            {
              model: Product,
              as: "product",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: Topping,
              as: "toppings",
              attributes: { exclude: ["createdAt", "updatedAt"] },
              through: { attributes: [] },
            },
          ],
        },
        {
          model: OrderUser,
          as: "orderUser",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.send("eror");
    console.log(error);
  }
};

exports.getTransaction = async (req, res) => {
  try {
    let data = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Topping, as: "toppings", through: { attributes: [] } },
        { model: Product, as: "products" },
      ],
    });
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getGlobalTransaction = async (req, res) => {
  try {
    let data = await Transaction.findAll({
      attributes: { exclude: ["updatedAt", "id", "UserId"] },
      include: [
        {
          model: History,
          as: "history",
          attributes: { exclude: ["userId"] },

          include: [
            {
              model: Product,
              as: "product",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: Topping,
              as: "toppings",
              attributes: { exclude: ["createdAt", "updatedAt"] },
              through: { attributes: [] },
            },
          ],
        },
        {
          model: OrderUser,
          as: "orderUser",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.send("eror");
    console.log(error);
  }
};
exports.updateTransaction = async (req, res) => {
  let { id, status } = req.body;
  try {
    let data = await Transaction.update(
      {
        status: status,
      },
      { where: { id: id } }
    );
    res.json(data);
  } catch (error) {
    res.send("eror");
    console.log(error);
  }
};
exports.createCart = async (req, res) => {
  const { id, qty, toppings, price } = req.body;
  try {
    let arrs = [];
    let data = await Cart.create({
      productId: id,
      qty: qty,
      userId: req.user.id,
      price: price,
    });
    for (a of toppings) {
      let datas = await Topping.findByPk(a);
      arrs.push(datas);
    }
    await data.addTopping(arrs);
    console.log(arrs);
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.updateQty = async (req, res) => {
  const id = req.params.id;
  const { qty, price } = req.body;
  try {
    let data = await Cart.update(
      {
        qty: qty,
        price: price,
      },
      { where: { id: id } }
    );
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    let data = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Topping, as: "toppings", through: { attributes: [] } },
        { model: Product, as: "products" },
      ],
    });

    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
exports.deleteProductCart = async (req, res) => {
  const { id } = req.body;
  try {
    let destroy = await Cart.destroy({
      where: {
        [Op.and]: [{ userId: req.user.id }, { id: id }],
      },
    });
    res.send({ product: destroy });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
