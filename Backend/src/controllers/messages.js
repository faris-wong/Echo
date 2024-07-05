const MessagesModel = require("../models/Messages");

const seedMessages = async (req, res) => {
  try {
    await MessagesModel.deleteMany({});

    await MessagesModel.create([
      {
        message: "Hello friends",
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
    const messages = await MessagesModel.find();
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, msg: "error getting messages" });
  }
};

const createMessages = async (req, res) => {
  try {
    const newMessage = {
      message: req.body.message,
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
