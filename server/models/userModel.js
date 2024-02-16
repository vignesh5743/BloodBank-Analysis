const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ["donor", "organisation", "hospital", "admin"],
  },
  name: {
    type: String,
    required: function () {
      if (this.userType == "admin" || this.userType == "donor") {
        return true;
      }
      return false;
    },
  },

  hospitalName: {
    type: String,
    required: function () {
      if (this.userType == "hospital") {
        return true;
      }
      return false;
    },
  },

  organisationName: {
    type: String,
    required: function () {
      if (this.userType == "organisation") {
        return true;
      }
      return false;
    },
  },

  address: {
    type: String,
    required: function () {
      if (!this.userType == "organisation" || this.userType == "hospital") {
        return true;
      }
      return false;
    },
  },
  website: {
    type: String,
    required: function () {
      if (this.userType == "organisation") {
        return true;
      }
      return false;
    },
  },
  age: {
    type: Number,
    required: function () {
      if (this.userType == "donor") {
        return true;
      }
      return false;
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: function () {
      if (this.userType == "donor") {
        return true;
      }
      return false;
    },
  },
  blood: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "A1B", "AB+", "O+", "O-", "AB-"], 
    required: function () {
      if (this.userType == "donor") {
        return true;
      }
      return false;
    }, 
  },
  state: {
    type: String,
    enum: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Other",
    ],
    required: function () {
      if (this.userType == "donor") {
        return true;
      }
      return false;
    },
  },
  password: {
    type: String,
    required: true,
  },

  DOB: {
    type: Date,
    required: function () {
      if (this.userType == "donor") {
        return true;
      }
      return false;
    },
  },
},{
  timestamps: true,
});

const Users =mongoose.model("users", userSchema);
module.exports = Users

