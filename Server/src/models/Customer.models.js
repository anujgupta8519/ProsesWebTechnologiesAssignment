import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  emailId: {
    type: String,
    required: [true, "Email Id is required"],
    unique: true
  },
  mobileNumber: {
    type: Number,
    required: [true, "Mobile Number is required"],
    unique: true
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },

  country: {
    type: String,
    required: [true, "Country is required"],
  },
  state:{
    type: String,
    required: [true, "State is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",  
  },
 
});


export const Customer = mongoose.model("Customer", customerSchema)

