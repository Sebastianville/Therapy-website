import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },
      
      last_name: {
        type: String,
        required: true,
      },

      date_of_birth: {
        type: Date,
        required: true,
      },

      contact: {
        phone: {
          // Maybe use regex to enforce an 11-digit phone number format
          type: String,
          required: true,
          unique: true,
        },
        
        email: {
          // Need to validate proper email format
          type: String,
          unique: true,
        },
        //! Need to figure out if this is where password will go
        // password: { 
        //   //The password has to be a minimum required lenght long 
        //   type: String, 
        //   },
      },
    },
  //? Unlinke the created_at that only shows when it is created. The timestamps automatically adds createdAt and updatedAt fields. So whenever a user is updated Mongoose will handle timestamps for me
    { timestamps: true } 
)

export default mongoose.model("User", userSchema)