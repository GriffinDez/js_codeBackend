import { mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async()=>{
    try {
        const dbConn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        //> To check if we connected to the correct host
        console.log(`Db Connected successfully at DBHOST : ${dbConn.connection.host}`);
    } catch (err) {
        console.log("MongoDb connection FAILED", err);
        process.exit(1)
    }
}


export default connectDb;

