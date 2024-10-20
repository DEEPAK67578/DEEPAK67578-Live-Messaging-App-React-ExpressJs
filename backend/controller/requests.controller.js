const chatsModal = require("../model/chats.modal");
const individualRequestsModal = require("../model/individualRequests.modal");
const userModal = require("../model/request.modal");
const { signUpModel } = require("../model/signup.model");

module.exports.getRequest = async (req, res) => {
  const { id } = req.body;
  console.log(req.userId);

  const existingRequests = await individualRequestsModal.find({
     from:id,
     to:req.userId,
     requestState:"Pending"
  });

  const toToUser = await individualRequestsModal.find({
    from:req.userId,
    to:id,
    requestState:"Pending"
 });
  

  if (existingRequests.length > 0 || toToUser.length > 0) {
    return res.status(401).json("Request Already Exists");
  }

  const individualRequests = new individualRequestsModal({
    from: req.userId,
    to: id,
  });


  individualRequests.save().then((val) => {
    return res.status(200).json("Request Sent SuccessFully");
  });
};

module.exports.getRequestForUser = async (req, res) => {
  const requestsForUser = await individualRequestsModal.find({
    to: req.userId,
    requestState: "Pending",
  });
  console.log(requestsForUser);
  let usersArr = [];
  for (const data of requestsForUser) {
    const user = await signUpModel.findOne(
      { _id: data.from },
      { description: 1, name: 1, email: 1, id: 1 }
    );
    usersArr.push({
      user: user,
    });
  }
  res.status(200).json({ requests: usersArr, statusText: "Success" });
};

module.exports.accrejreq = async (req, res) => {
  const { ReqSenderId, handler } = req.body;
  try {
    if (handler == "accept") {
      const request = await individualRequestsModal.findOne({
        from: ReqSenderId,
        to: req.userId,
      });

      const chat =new chatsModal({
        member:[
          ReqSenderId,req.userId
        ]
      })

      await chat.save()
      request.requestState = "accept";
      const result = await request.save();
      res.status(200).json(result);
    } else if (handler == "reject") {
      const request = await individualRequestsModal.findOneAndDelete({
        from: ReqSenderId,
        to: req.userId,
      });
      const result = await request.save();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
