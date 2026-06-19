import mongoose from "mongoose";

let MNONGODB_URI=process.env.MONGO_URL
let isConnected = false;

async function dbConnect(){

    if(isConnected){
        console.log("MongoDB is already connected")
        return
    }
 try {
    const db = await mongoose.connect(MNONGODB_URI);
    isConnected=db.connections[0].readyState===1;
    console.log("db connected",db);
 } catch (error) {
    console.error("failed to connect",error)
    throw error
 }  
} 

export default dbConnect;