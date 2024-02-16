

//-------------------------

const Inventory = require("../models/inventoryModal");
const User = require("../models/userModel");

const Q1 = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $match: { inventoryType: "in" } 
      },
      {
        $group: {
          _id: "$donor",
          totalDonated: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "donorInfo"
        }
      },
      {
        $unwind: "$donorInfo"
      },
      {
        $sort: { totalDonated: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          donorName: "$donorInfo.name",
          bloodGroup: "$donorInfo.blood",
          totalDonated: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { Q1 };



