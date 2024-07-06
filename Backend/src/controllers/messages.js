const MessagesModel = require("../models/Messages");
const ProfileModel = require("../models/Profile");
const AuthModel = require("../models/Auth");

const seedMessages = async (req, res) => {
  try {
    await MessagesModel.deleteMany({});

    await MessagesModel.create([
      {
        _id: "66881cf5fea2225a9a4278f8",
        message: "Hello friends",
        profilelink: {
          _id: "6688de47e2e6505a526ed07a",
          username: "faris",
        },
      },
      {
        _id: "66881cedfea2225a9a4278f6",
        message: "Hello family",
        profilelink: {
          _id: "6688de47e2e6505a526ed07a",
          username: "faris",
        },
      },
      {
        _id: "66881a6afea2225a9a4278e5",
        message: "Hello World",
        profilelink: {
          _id: "6688de47e2e6505a526ed07a",
          username: "faris",
        },
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const allMessages = await MessagesModel.find().populate(
      "profilelink",
      "username community"
    );
    res.json(allMessages);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, msg: "error getting messages" });
  }
};

const createMessages = async (req, res) => {
  try {
    const message = await ProfileModel.findOne({ _id: req.params.id });
    const newMessage = {
      message: req.body.message,
      profilelink: message,
    };
    await MessagesModel.create(newMessage);
    res.json({ status: "ok", msg: "Message created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating message" });
  }
};

const updateMessages = async (req, res) => {
  try {
    const updateMessage = {
      message: req.body.message,
    };
    await MessagesModel.findByIdAndUpdate(req.body.id, updateMessage);
    res.json({ status: "ok", msg: "Message updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error updating messages" });
  }
};

const deleteMessages = async (req, res) => {
  try {
    await MessagesModel.findByIdAndDelete(req.body.id);
    res.json({ status: "ok", msg: "Message deleted" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error deleting message" });
  }
};

module.exports = {
  getMessages,
  createMessages,
  updateMessages,
  deleteMessages,
  seedMessages,
};
