import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set('strictQuery', true); //dont know what it does
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express()
mongoose.set('strictQuery', true);
dotenv.config()
const url = `mongodb+srv://vuuqueen:vuuqueen@vuuqueen.sbkl9ds.mongodb.net/?retryWrites=true&w=majority`;
const connect = async () => {
    try {
       mongoose.connect(url);
        console.log("Connected to mongoDB.")
    } catch (error) {
        throw error;
    }
 
}; 

mongoose.connection.on ("disconnected", () => {
    console.log("mongoDB disconnected!:(") //in this case if theres a disconnection problem we can just log this problem if disconenncted it will try to connect again
});

mongoose.connection.on ("connected", () => {
    console.log("mongoDB connected!:)") //if delete ip adress its gonna return mongodb disconnected
});

//middlewares its able to reach our requests and response before sending anything to user
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //ok in you api you can use any body

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => { //error handling middleware we are able to customize our errors
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong :/"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
});




app.listen(4000, () => {
    connect(); //call the function
    console.log("Connected to backend :)!")
})