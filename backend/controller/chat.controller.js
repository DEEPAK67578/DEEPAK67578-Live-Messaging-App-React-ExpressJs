const chatsModal = require("../model/chats.modal");
module.exports.createChat = async (req, res) => {
  const newChat = new chatsModal({
    member: [req.body.senderId, req.body.recieverId],
  });

  try {
    const res = await newChat.save();
    res.status(200).json(res);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.userChats = async (req, res) => {
  try {
    const chat = await chatsModal.find({
      member: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.findChat = async (req, res) => {
  try {
    const chat = await chatsModal.findOne({
      member: { $all: [req.params.firstId, req.param.secondId] },
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
