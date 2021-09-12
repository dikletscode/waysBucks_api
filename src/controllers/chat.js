const { Notif } = require("../../models");

exports.insertMsg = async (recipent, sender, msg) => {
  try {
    await Notif.create({
      idrecipent: recipent,
      idsender: sender,
      message: msg,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.findMsg = async (idrecipent) => {
  try {
    let data = await Notif.findAll({
      where: { idrecipent: idrecipent },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
