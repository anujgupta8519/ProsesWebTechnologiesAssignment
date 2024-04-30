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
app.use("/api/client",clientrouter);


export {app};