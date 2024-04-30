import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';
import {Client} from "../models/Client.models.js";



const adminLogin = asyncHandler(async (req, res) => {

   
    const { username, password } = req.body;
    console.log(username, password);

    if (!username) {
        throw new ApiError(400, "username is required");
        
    }
    if (!password) {
        throw new ApiError(400, "password is required");
        
    }

    if ((username.trim() !== process.env.ADMIN_USERNAME) || (password.trim() !== process.env.ADMIN_PASSWORD)) {
        throw new ApiError(400, "Invalid username or password ");
    }
    if (username.trim() === process.env.ADMIN_USERNAME && password.trim() === process.env.ADMIN_PASSWORD) {
         console.log("Login successfull");
        const token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.ADMIN_JWT, { expiresIn: '1d' });
        const options = {
            httpOnly: true,
            secure: true,
        }
        
        return res.status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, {
            AccessToken:token,
            username: process.env.ADMIN_USERNAME,
            userType: "Admin"
        }, "Login successfull"));
    }
   
});

const addClient = asyncHandler(async (req, res) => {

    const { clientName, emailId, mobileNumber, address, subscriptionStartDate, subscriptionEndDate, password } = req.body;

    if ([clientName, emailId, mobileNumber, address, subscriptionStartDate, subscriptionEndDate, password].some(x => !x || !x.trim())) {
        throw new ApiError(400, "All fields are required"); 
    }

    const existedUser = await Client.findOne({ emailId });

    if (existedUser) {
        throw new ApiError(400, "Client already exists");
        
    }

    const newclient = await Client.create({
        clientName,
        emailId,
        mobileNumber,
        address,
        subscriptionStartDate,
        subscriptionEndDate,
        password
    });

if (!newclient) {
    throw new ApiError(400, "Unable to create client");
    
}
res.status(200).json(new ApiResponse(200, newclient));
});


const updateClient = asyncHandler(async (req, res) => {

    const { clientName, emailId, mobileNumber, address, subscriptionStartDate, subscriptionEndDate } = req.body;
    if ([clientName, emailId, mobileNumber, address, subscriptionStartDate, subscriptionEndDate].some(x => !x)) {
        throw new ApiError(400, "All fields are required");
        
    }

    const existedUser = await Client.findOne({ emailId });

    if (!existedUser) {
        throw new ApiError(400, "Client not found");
        
    }
   const updateClient = await Client.findByIdAndUpdate(existedUser._id, {
        clientName,
        emailId,
        mobileNumber,
        address,
        subscriptionStartDate,
        subscriptionEndDate
    }, { new: true });
    res.status(200).json(new ApiResponse(200, updateClient));
});

const deleteClient = asyncHandler(async (req, res) => {


    const _id = req.params.id

    
   
    const existedUser = await Client.findOne({ _id });

    if (!existedUser) {
        throw new ApiError(400, "Client not found");
        
    }
    await Client.findByIdAndDelete(existedUser._id);
    res.status(200).json(new ApiResponse(200, existedUser));
});

const getAllCleints = asyncHandler(async (req, res) => {

    const clients = await Client.find().select("-password");

    res.status(200).json(new ApiResponse(200, clients));

});




export {adminLogin, addClient, updateClient, deleteClient, getAllCleints}