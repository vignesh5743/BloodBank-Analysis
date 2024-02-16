

const Inventory = require("../models/inventoryModal");

const Q9 = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is missing in the request.',
      });
    }

    const result = await Inventory.aggregate([
      {
        $match: {
          inventoryType: "in", // Filter only donations with inventoryType "in"
          city: city, // Filter by the inputted city
        },
      },
      {
        $group: {
          _id: {
            city: "$city",
            bloodGroup: "$bloodGroup",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.city",
          bloodInventory: {
            $push: {
              bloodGroup: "$_id.bloodGroup",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          bloodInventory: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { Q9 };

//----------------------------------------
