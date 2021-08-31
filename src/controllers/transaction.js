const { Transaction, ProductTopping, Topping, User } = require("../../models");

exports.transaction = async (req, res) => {
  let ids = req.params.id;
  const { id, qty, toppings } = req.body;

  try {
    let arrs = [];

    for (a of toppings) {
      let data = await Topping.findByPk(a);
      arrs.push(data);
    }
    console.log(arrs);
    // if (arrs.length) {
    //   await ProductTopping.create({
    //     productId: id,
    //     qty: qty,
    //     toppings: arrs,
    //   });
    // }
    let datass = await ProductTopping.findAll({
      include: { model: Topping, as: "toppings" },
    });
    res.send({ product: datass });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "an Error occurred" } });
  }
};
