import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";




dotenv.config({
    path:"./.env"
});

app.listen(7000,()=>{
    connectDB();
    console.log("Server running on port 7000");
})