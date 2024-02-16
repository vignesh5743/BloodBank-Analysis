const Inventory = require('../models/inventoryModal');

const Q7 = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({
        success: false,
        message: 'Year must be provided.',
      });
    }

    const result = await Inventory.aggregate([
      {
        $match: { inventoryType: 'out' }, 
      },
      {
        $group: {
          _id: {
            hospital: '$hospital',
            email: '$email',
            year: { $year: '$date' },
            bloodGroup: '$bloodGroup',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $match: {
          '_id.year': Number(year), 
        },
      },
      {
        $group: {
          _id: {
            hospital: '$_id.hospital',
            email: '$_id.email',
            year: '$_id.year',
          },
          bloodGroups: {
            $push: {
              bloodGroup: '$_id.bloodGroup',
              totalQuantity: '$totalQuantity',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.hospital',
          foreignField: '_id',
          as: 'hospitalInfo',
        },
      },
      {
        $unwind: '$hospitalInfo',
      },
      {
        $project: {
          _id: 0,
          hospitalName: '$hospitalInfo.hospitalName',
          hospitalEmail: '$_id.email',
          year: '$_id.year',
          bloodGroups: 1,
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

module.exports = { Q7 };
