import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


import adminrouter from "./router/admin.router.js";
app.use("/api/admin",adminrouter);

import clientrouter from "./router/client.router.js";
import { ApiResponse } from "./utils/ApiResponse.js";
app.use("/api/client",clientrouter);

app.post("/api/logout",(req,res)=>{

    res.clearCookie("accessToken")
    .json(new ApiResponse(200,{},"Logged out successfully"))

  

})


export {app};