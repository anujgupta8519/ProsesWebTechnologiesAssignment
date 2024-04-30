import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

import { asyncHandler } from '../utils/AsyncHandler.js';
import { Client } from '../models/Client.models.js';


export const auth = asyncHandler(async (req, res, next) => {
    try {
       
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       console.log(token)

        if (!token) {
            throw new ApiError(401, "Unauthorized request token")
        }

        if (token===undefined) {
            throw new ApiError(401, "Unauthorized request token")
        }
        const decoded = jwt.verify(token, process.env.USER_JWT);
      

        if (!decoded) {
            throw new ApiError(401, "Unauthorized request token 11")
        }

        const client  = await Client.findOne({ emailId: decoded.emailId }).select("-password");
        console.log(client);


        if (!client) {
            throw new ApiError(401, "Unauthorized request token 12")
        }
        req.user =  client

        next();

    }catch(error){

        throw new ApiError(401,error)

    }
})