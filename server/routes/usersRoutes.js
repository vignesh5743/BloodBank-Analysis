const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModal");
const mongoose = require("mongoose");


//reg new user
router.post("/register", async (req, res) => {
  try {
    //check if user already existing
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //save user

    const user = new User(req.body);
    await user.save();

    return res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }

    if(user.userType !== req.body.userType) {
      return res.send({ success: false, message:`user is not registered as a ${req.body.userType}`, });


    }

    //check compare password

    const vaildPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!vaildPassword) {
      return res.send({ success: false, message: "Invalid password" });
    }

    //generate token

    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "5d",
    });

    return res.send({
      success: true,
      message: "You logged in successfully",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get Current User

router.get("/get-current-user",authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    

    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get unique donors in organization

router.get("/get-all-donors", authMiddleware, async (req, res) => {
  try {
    // unique donor ids from inventory
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    const uniqueDonorIds = await Inventory.distinct("donor", {
      organisation,
    });

    const donors = await User.find({
      _id: { $in: uniqueDonorIds },
    });

    return res.send({
      success: true,
      message: "Donors fetched successfully",
      data: donors,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get unique hospital name in org

router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
  try {
    //unique hospital from inventory
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    const uniqueHospitalIds = await Inventory .distinct("hospital", {
      organisation,
    });

    const hospitals = await User.find({
      _id: { $in: uniqueHospitalIds },
    });

    return res.send({
      success: true,
      message: "Hospitals fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get unique org for a donor

router.get("/get-all-organisations-of-a-donor",authMiddleware,async (req, res) => {
    try {
      // get unique hospital from inventory
      const donor = new mongoose.Types.ObjectId(req.body.userId);
      const uniqueOrganizationIds = await Inventory.distinct("organisation", {
        donor,
      });

      const hospitals = await User.find({
        _id: { $in: uniqueOrganizationIds },
      });

      return res.send({
        success: true,
        message: "Hospitals fetched successfully",
        data: hospitals,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// get all unique organizations for a hospital
router.get("/get-all-organisations-of-a-hospital",authMiddleware,async (req, res) => {
    try {
      // get all unique organizations ids from inventory
      const hospital = new mongoose.Types.ObjectId(req.body.userId);
      const uniqueOrganisationIds = await Inventory.distinct("organisation", {
        hospital,
      });

      const hospitals = await User.find({
        _id: { $in: uniqueOrganisationIds },
      });

      return res.send({
        success: true,
        message: "Hospitals fetched successfully",
        data: hospitals,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }
);


module.exports = router;
