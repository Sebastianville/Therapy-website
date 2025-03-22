import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },

      last_name: {
        type: String,
        required: true,
        index: true,
      },
      
      //I want the provider to add as many specality they want. 
      specality: {
        type: [String],  
        required: true,
      },
      //the same for languages. I want the provider to add multiple languages
      languages: {
        type: [String],  
        required: true,
      },
      insurance: [
        {
          provider: {type: String, required: true},
          plan: {type: String, required: true},
        },
      ],
      contact: {
        phone: {
          // Maybe use regex to enforce an 11-digit phone number format
          type: String,
          required: true,
          unique: true,
          index: true,
        },
        email: {
          // Need to validate proper email format. Needs to required the @
          type: String,
          required: true,
          unique: true,
          index: true,
        },

        //! Need to figure out if this is where password will go
        // password: { 
        //     //The password has to be a minimum required lenght long 
        //     type: String, 
        // },
      },
    },
    //? Unlinke the created_at that only shows when it is created. The timestamps automatically adds createdAt and updatedAt fields. So whenever a provider is updated Mongoose will handle timestamps for me
    { timestamps: true } 
)

export default mongoose.model("Provider", providerSchema)