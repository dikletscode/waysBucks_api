const { Notif, Chat } = require("../../models");

exports.sendNotif = async (req, res) => {
  const { recipent, sender, msg } = req.body;
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

exports.findNotif = async (req, res) => {
  const { idrecipent } = req.body;
  try {
    let data = await Notif.findAll({
      where: { idrecipent: idrecipent },
      order: [["updatedAt", "DESC"]],
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.delMsg = async (id) => {
  try {
    let data = await Notif.destroy({
      where: { id: id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
exports.chat = async (req, res) => {
  let { chat, room } = req.body;
  try {
    let prev = await Chat.findOne({ where: { room: room } });
    if (prev) {
      let te = await Chat.update(
        {
          message: chat,
          room: room,
        },
        { where: { room: room } }
      );
      console.log(te);
    } else {
      await Chat.create({
        message: chat,
        room: room,
      });
    }
    res.send({ msg: "update" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "error" });
  }
};
exports.getChat = async (req, res) => {
  const room = req.query.room;
  try {
    let chat = await Chat.findOne({ where: { room: room } });
    res.send({ data: chat });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "error" });
  }
};
