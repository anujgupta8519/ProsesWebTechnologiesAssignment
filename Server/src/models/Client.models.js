import mongoose from "mongoose";

import bycrpt from "bcryptjs";

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, "Client Name is required"],
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
    subscriptionStartDate: {
        type: Date,
        required: [true, "Subscription Start Date is required"],
    },
    subscriptionEndDate: {
        type: Date,
        required: [true, "Subscription End Date is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});


clientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bycrpt.hash(this.password, 10);
    next();
});

clientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrpt.compare(enteredPassword, this.password);
};

export const Client = mongoose.model("Client", clientSchema)