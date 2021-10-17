const sequelize = require("sequelize");
const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

const {
  Transaction,
  OrderUser,
  Topping,
  Product,
  Cart,
  History,
} = require("../../models");
const midtransClient = require("midtrans-client");
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

exports.midtransTransac = async (req, res) => {
  const { fullname, email, phone, postCode, address, totalPrice } = req.body;
  try {
    let snapTransac = await snap.createTransaction({
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: totalPrice,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        full_name: fullname,
        email: email,
        phone: phone,
      },
    });
    let payment = {
      token: snapTransac.token,
      redirect_url: "http://localhost:3000/profile",
    };
    res.status(200).send({ payment: payment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};

exports.transaction = async (req, res) => {
  const { fullname, id, email, phone, postCode, totalPrice, address } =
    req.body;
  try {
    let order = await Cart.findAll({ where: { userId: req.user.id } });
    let file = await cloudinary.uploader.upload(req.file.path, {
      folder: "attachment",
      use_filename: true,
    });

    id && await Transaction.create(
      {
        id: id,
        userId: req.user.id,
        status: "Waiting Approve",
        attachment: file.secure_url,
        cloudId: file.public_id,
        orderUser: {
          fullname,
          email,
          phone,
          postCode,
          address,
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

    order.map(async (item) => {
      await Cart.destroy({ where: { id: item.id } });
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["updatedAt", "DESC"]],
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
    res.status(500).send("eror");
    console.log(error);
  }
};
exports.detailHistory = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Transaction.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
    console.log(data);
    res.json({ transaction: data });
  } catch (error) {
    res.status("500").send("eror");
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
      attributes: { exclude: ["updatedAt", "userId"] },
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
    res.status(500).send({ error: { message: "an Error occurred" } });
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
      order: [["updatedAt", "ASC"]],
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
        [sequelize.Op.and]: [{ userId: req.user.id }, { id: id }],
      },
    });
    res.send({ product: destroy });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
exports.bestProduct = async (req, res) => {
  try {
    let data = await History.findAll({
      attributes: [
        "productId",
        [sequelize.fn("sum", sequelize.col("qty")), "total"],
      ],
      group: ["productId"],
      limit: 4,
      order: sequelize.literal("total DESC"),
    });
    console.log(data);
    res.send({ product: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
