const Inventory = require("../models/inventoryModal");

const Q3 = async (req, res) => {
  try {
    const query3Result = await Inventory.aggregate([
      {
        $match: { inventoryType: "out" }
      },
      {
        $group: {
          _id: {
            hospital: "$hospital",
            email: "$email",
            year: { $year: "$date" },
            bloodGroup: "$bloodGroup"
          },
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $group: {
          _id: {
            hospital: "$_id.hospital",
            email: "$_id.email",
            year: "$_id.year"
          },
          bloodGroups: {
            $push: {
              bloodGroup: "$_id.bloodGroup",
              totalQuantity: "$totalQuantity"
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.hospital",
          foreignField: "_id",
          as: "hospitalInfo"
        }
      },
      {
        $unwind: "$hospitalInfo"
      },
      {
        $project: {
          _id: 0,
          hospitalName: "$hospitalInfo.hospitalName",
          hospitalEmail: "$_id.email",
          year: "$_id.year",
          bloodGroups: 1
        }
      }
    ]);

    return res.json(query3Result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Q3 };
