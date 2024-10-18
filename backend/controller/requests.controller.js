const userModal = require("../model/request.modal");

module.exports.getRequest = async (req, res) => {
  const { id } = req.body;
  console.log(req.userId)
  const existingRequests = await userModal.find({
    userId: req.userId,
    "requests.id": id,
  });

  console.log(existingRequests)
  if (existingRequests.length > 0) {
    return res.status(401).json("Request Already Exists");
  }

  const existingUser = await userModal.findOne({ userId: req.userId });
  if (existingUser) {
    existingUser.requests.push({ id: id });
    existingUser.save().then((val)=> {
        return res.status(200).json("Request Sent SuccessFully")
    });
  } else {
    const newReq = new userModal({
      userId: req.userId,
      requests: [{ id: id }],
    });
    newReq.save().then((val)=> {
        return res.status(200).json("Request Sent SuccessFully")
    })
  }
};
