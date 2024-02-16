const Inventory = require('../models/inventoryModal');

const Q8 = async (req, res) => {
  try {
    const { city, bloodGroup, quantity } = req.body;

    if (!city || !bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'City, bloodGroup, and quantity must be provided for deletion.',
      });
    }

    const inventoryItem = await Inventory.findOne({
      city,
      bloodGroup,
      quantity: { $gte: quantity },
    });

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: 'No matching inventory item found for deletion.',
      });
    }

    const updatedQuantity = inventoryItem.quantity - quantity;

    await Inventory.updateOne(
      { _id: inventoryItem._id },
      { $set: { quantity: updatedQuantity } }
    );

    return res.json({
      success: true,
      message: 'Inventory item updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { Q8 };
