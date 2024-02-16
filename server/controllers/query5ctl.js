

const Inventory = require('../models/inventoryModal');

const Q5 = async (req, res) => {
  try {
    const k = parseInt(req.query.k); 

    if (isNaN(k) || k <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing limit value (k).',
      });
    }

    const result = await Inventory.aggregate([
      {
        $match: { inventoryType: 'in' },
      },
      {
        $group: {
          _id: '$donor',
          totalDonated: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'donorInfo',
        },
      },
      {
        $unwind: '$donorInfo',
      },
      {
        $sort: { totalDonated: -1 },
      },
      {
        $limit: k,
      },
      {
        $project: {
          _id: 0,
          donorName: '$donorInfo.name',
          bloodGroup: '$donorInfo.blood',
          totalDonated: 1,
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

module.exports = { Q5 };
