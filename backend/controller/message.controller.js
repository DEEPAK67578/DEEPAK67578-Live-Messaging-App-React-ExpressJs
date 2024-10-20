const messageModal = require("../model/message.modal");

module.exports.addMessage = async (req,res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModal({
    chatId,
    senderId,
    text
  });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getmessages = async (req,res) => {
  const { chatId } = req.params;
  try {
    const result = await messageModal.find({ chatId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
