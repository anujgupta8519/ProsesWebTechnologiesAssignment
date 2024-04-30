import { Client } from "../models/Client.models.js";
import { Customer } from "../models/Customer.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken';

const login = asyncHandler(async (req, res) => {
    const { emailId, password } = req.body;

    console.log(emailId, password)
    if ((!emailId) || (!password)) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await Client.findOne({ emailId });
    if (!existedUser) {
        throw new ApiError(400, "Client not found");
    }
    const isMatch = await existedUser.matchPassword(password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }
    
    
    const subscriptionEnd = existedUser.subscriptionEndDate; 
    const currentDate = new Date();
    if (currentDate > subscriptionEnd) {
        throw new ApiError(400, "Subscription has expired. Login not allowed.");
    }


    const accessToken = jwt.sign({ emailId: existedUser.emailId }, process.env.USER_JWT, { expiresIn: '1d' });
    const options = {
        httpOnly: true,
        secure: true,
    }
    res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {
        AccessToken:accessToken,
        emailId: existedUser.emailId,
        userType: "Client"
    }, "Login successfull"));





  
    
});

const addCustomer = asyncHandler(async (req, res) => {

    const client = req.user

    const newClient = await Client.findById(client._id);
    if (!newClient) {
        throw new ApiError(400, "Client not found");
    }
    
    const { name, emailId, mobileNumber, address, country, state, city } = req.body;
    console.log(name, emailId, mobileNumber, address, country, state, city)
    if ([name, emailId, mobileNumber, address, country, state, city].some(x => !x || !x.trim())) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await Customer.findOne({ emailId });
    if (existedUser) {
        throw new ApiError(400, "Customer already exists");
    }
    const newCustomer = await Customer.create({
        name,
        emailId,
        mobileNumber,
        address,
        country,
        state,
        city,
        createdBy: newClient._id
    });
    if (!newCustomer) {
        throw new ApiError(400, "Unable to create customer");
    }
    res.status(200).json(new ApiResponse(200, newCustomer));
});

const updateCustomer = asyncHandler(async (req, res) => {

    const client = req.user
    const newClient = await Client.findById(client._id);
    if (!newClient) {
        throw new ApiError(400, "Client not found");
    }
    const { name, emailId, mobileNumber, address, country, state, city } = req.body;
    console.log(name, emailId, mobileNumber, address, country, state, city)
    if ([name, emailId, mobileNumber, address, country, state, city].some(x => !x)) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await Customer.findOne({ emailId });
    if (!existedUser) {
        throw new ApiError(400, "Customer not found");
    }

    if (existedUser.createdBy.toString() !== newClient._id.toString()) {
        throw new ApiError(400, "You are not authorized to update this customer");
        
    }




    const updateCustomer = await Customer.findByIdAndUpdate(existedUser._id, {
        name,
        emailId,
        mobileNumber,
        address,
        country,
        state,
        city
    });
    if (!updateCustomer) {
        throw new ApiError(400, "Unable to update customer");
    }
    res.status(200).json(new ApiResponse(200, updateCustomer));
});

const deleteCustomer = asyncHandler(async (req, res) => {



    const client = req.user

    const newClient = await Client.findById(client._id);
    if (!newClient) {
        throw new ApiError(400, "Client not found");
    }
    const _id = req.params.id


    const existedUser = await Customer.findOne({ _id });

    if (!existedUser) {
        throw new ApiError(400, "Customer not found");
        
    }
    if (existedUser.createdBy.toString() !== newClient._id.toString()) {
        throw new ApiError(400, "You are not authorized to delete this customer");
        
    }
    await Customer.findByIdAndDelete(existedUser._id);
    res.status(200).json(new ApiResponse(200, "Customer deleted successfully"));
    

});


const getAllCustomer = asyncHandler(async (req, res) => {


    const client = req.user

    const newClient = await Client.findById(client._id);
    if (!newClient) {
        throw new ApiError(400, "Client not found");
    }



    const customers = await Customer.aggregate([
     {
        $lookup: {
            from: "clients",
            localField: "createdBy",
            foreignField: "_id",
            as: "client",
        },
     },{
        $addFields: {
            client: {
                $arrayElemAt: ["$client", 0],
            },
        },
     }
  
    ]);
    res.status(200).json(new ApiResponse(200, customers));
});



export {login, addCustomer, updateCustomer, deleteCustomer, getAllCustomer}
