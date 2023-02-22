const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },
    
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    
    token: {
        type: String,
        required: true,
        trim: true,
    },
    
    // job: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   validate(value) {
    //     if (value.length < 2)
    //       throw new Error("Invalid job, must be at least 2 characters.");
    //   },
    // },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;