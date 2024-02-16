// const { ObjectId } = require('mongodb');
// const db = require('./your-db-connection'); // Replace with your MongoDB connection

// // Function to add a new document
// const addDocument = async (req, res) => {
//   try {
//     const { BloodGroup, email, quantity, city, Date } = req.body;

//     // Ensure the inventoryType is "in"
//     const newDocument = {
//       BloodGroup,
//       email,
//       quantity,
//       city,
//       Date,
//       inventoryType: 'in', // Set the inventoryType to "in"
//     };

//     await db.collection('inventories').insertOne(newDocument);
//     res.json({ success: true, message: 'Document added successfully' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Function to delete a document
// const deleteDocument = async (req, res) => {
//   try {
//     const { email, quantity } = req.body;

//     // Find and delete the document
//     const result = await db.collection('inventories').deleteOne({
//       email,
//       quantity,
//       inventoryType: 'in', // Ensure the inventoryType is "in"
//     });

//     if (result.deletedCount === 1) {
//       res.json({ success: true, message: 'Document deleted successfully' });
//     } else {
//       res.json({ success: false, message: 'Document not found or not deleted' });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   addDocument,
//   deleteDocument,
// };


// query4ctl.js

// const Inventory = require('../models/inventoryModal');

// const Q4 = async (req, res) => {
//   try {
//     // Get input parameters from the request body
//     const { email, quantity } = req.body;

//     // Check if email and quantity are provided
//     if (!email || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and quantity must be provided for deletion.',
//       });
//     }

//     // Delete documents matching the email and quantity
//     await Inventory.deleteMany({ email, quantity });

//     return res.json({
//       success: true,
//       message: 'Documents deleted successfully.',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {Q4};






// const Inventory = require('../models/inventoryModal');

// const Q4 = async (req, res) => {
//   try {
//     // Get input parameters from the request body
//     const { city, bloodGroup, quantity } = req.body;

//     // Check if city, bloodGroup, and quantity are provided
//     if (!city || !bloodGroup || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: 'City, bloodGroup, and quantity must be provided for deletion.',
//       });
//     }

//     // Delete documents matching the criteria
//     const result = await Inventory.deleteMany({
//       inventoryType: 'in', // Specify the inventoryType as "in"
//       city: city,           // Use the provided city
//       bloodGroup: bloodGroup, // Use the provided bloodGroup
//       quantity: quantity     // Use the provided quantity
//     });

//     if (result.deletedCount > 0) {
//       return res.json({
//         success: true,
//         message: `${result.deletedCount} documents deleted successfully.`,
//       });
//     } else {
//       return res.json({
//         success: true,
//         message: 'No documents matching the criteria were found.',
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = { Q4 };




const Inventory = require('../models/inventoryModal');

const Q4 = async (req, res) => {
  try {
    const { city, bloodGroup, quantity } = req.body;

    if (!city || !bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'City, bloodGroup, and quantity must be provided for deletion.',
      });
    }

    const result = await Inventory.deleteMany({
      inventoryType: 'in', 
      city: city,           
      bloodGroup: bloodGroup, 
      quantity: quantity     
    });

    if (result.deletedCount > 0) {
      const totalQuantity = await Inventory.aggregate([
        {
          $match: {
            inventoryType: 'in',
            city: city,
            bloodGroup: bloodGroup,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$quantity' },
          },
        },
      ]);

      if (totalQuantity.length > 0) {
        // Subtract the deleted quantity
        const updatedTotal = totalQuantity[0].total - quantity;

        // Update the total quantity in the collection
        await Inventory.updateOne(
          {
            inventoryType: 'in',
            city: city,
            bloodGroup: bloodGroup,
          },
          {
            $set: { quantity: updatedTotal },
          }
        );

        return res.json({
          success: true,
          message: `${result.deletedCount} documents deleted successfully. Total quantity updated.`,
        });
      }
    }

    return res.json({
      success: true,
      message: 'No documents matching the criteria were found.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { Q4 };
