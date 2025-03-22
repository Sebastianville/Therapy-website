import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: { 
    // Need to validate proper email format. Needs to detect that there is an @
    type: String, 
    unique: true 
    },

  password: { 
    //The password has to be a minimum required lenght long 
    type: String, 
    },
})

export const Admin = mongoose.model("Admin", AdminSchema);
