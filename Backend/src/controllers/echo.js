// const Bikes = require("../models/Bikes");

// const getBikes = async (req, res) => {
//   const allBikes = await Bikes.find();
//   res.json(allBikes);
// };

// const postBikes = async (req, res) => {
//   const bike = await Bikes.findById(req.body.id);
//   // const bike = await Bikes.find({ name: req.body.name });
//   res.json(bike);
// };

// const putBikes = async (req, res) => {
//   // await Bikes.create(req.body);
//   const createdBike = new Bikes({
//     type: req.body.type,
//     quantity: req.body.quantity,
//   });
//   await createdBike.save();
//   res.json({ status: "ok", msg: "saved" });
// };

// // testing your function. Unit Testing. you do not change your test but you change your data.
// const seedBikes = async (req, res) => {
//   await Bikes.deleteMany({});
//   try {
//     await Bikes.create([
//       {
//         _id: "667b7cf963635d29dc26cf31",
//         id: 1,
//         type: "road",
//         quantity: 10,
//       },
//       {
//         _id: "667b7cf963635d29dc26cf32",
//         id: 2,
//         type: "mountain",
//         quantity: 5,
//       },
//       {
//         _id: "667b7cf963635d29dc26cf33",
//         id: 3,
//         type: "trail",
//         quantity: 3,
//       },
//     ]);
//     res.json({ status: "ok", msg: "seeding successful" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "seeding error" });
//   }
// };

// const deleteBikes = async (req, res) => {
//   await Bikes.findByIdAndDelete(req.params.id);
//   // await Bikes.deleteOne({_id: req.params.id});
//   res.json({ status: "ok", msg: "deleted" });
// };

// const patchBikes = async (req, res) => {
//   const response = await Bikes.findByIdAndUpdate(req.params.id, {
//     type: req.body.type,
//     quantity: req.body.quantity,
//   });
//   // const response = await Bikes.updateOne(
//   //   { _id: req.params.id },
//   //   { type: req.body.type, quantity: req.body.quantity }
//   // );

//   res.json({ status: "ok", msg: "updated" });
// };

// module.exports = {
//   getBikes,
//   postBikes,
//   putBikes,
//   deleteBikes,
//   patchBikes,
//   seedBikes,
// };
