

const Inventory = require("../models/inventoryModal");

const Q2 = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $match: { inventoryType: "in" } 
      },
      {
        $group: {
          _id: {
            city: "$city",
            bloodGroup: "$bloodGroup"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.city",
          bloodInventory: {
            $push: {
              bloodGroup: "$_id.bloodGroup",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          bloodInventory: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { Q2 };
