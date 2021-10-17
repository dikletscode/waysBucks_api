const { Chat } = require("../../models");

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
