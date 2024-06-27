// const mongoose = require("mongoose");

// // if checks are satisfied via api side, these are the only constraints to be put inside the database
// // gives restraints to the data to be in this format
// // ORM - Object Relation Mapping
// // A model is an instance of a Schema
// const BikesSchema = new mongoose.Schema(
//   {
//     type: { type: String, require: true },
//     quantity: { type: Number, require: true },
//   },
//   // this like is optional because of the exports in the last line mongoose is forced to call it "bikes"
//   // optional but higher priority
//   { collection: "bikes" }
// );

// // this Bikes (can be chicken) here will never be used by user but used by express.js instead
// module.exports = mongoose.model("Bikes", BikesSchema);
