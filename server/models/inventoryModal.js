const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: true,
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    city:{
    type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    //new
    date:{
      type: Date,
      required: true,
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },



    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  {
    timestamps: true,
  }
);


const Inventory = mongoose.model("inventories", inventorySchema);

module.exports = Inventory;