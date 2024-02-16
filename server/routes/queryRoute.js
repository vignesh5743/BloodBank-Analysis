const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const { Q1 } = require('../controllers/query1ctl');
const {Q2} = require('../controllers/query2ctl');
const {Q3} = require('../controllers/query3ctl');
// const {Q4} = require('../controllers/query4ctl');
const {Q5} = require('../controllers/query5ctl');
const {Q6} = require('../controllers/query6ctl');
const {Q7} = require('../controllers/query7ctl');
const {Q8} = require('../controllers/query8ctl');
const {Q9} = require('../controllers/query9ctl');

router.get('/query1', Q1);
router.get('/query2', Q2);
router.get('/query3', Q3);
//router.post('/query4', query4ctl.Q4);
//router.post('/query4/add',  query4ctl.addDocument);

// Add route for deleting a document
// router.post('/query4', Q4);
//router.post('/query4', query4ctl.Q4);




router.get('/query5', Q5);
router.get('/query6', Q6);
router.get('/query7', Q7);
router.post('/query8', Q8);
router.get('/query9', Q9);
//const {Q4} = require('../controllers/query4ctl');





router.post('/query4', async (req, res) => {
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
        // Calculate the total quantity for the specified criteria
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
  });





module.exports = router;
 