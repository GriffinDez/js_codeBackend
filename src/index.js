// require("dotenv").config()   //-> correct. but, disturbs the code consistency


// consistent
import 'dotenv/config';
import connectDb from "./db/index.js";

//:: Approach_2
connectDb()






// ============================================================
// import { mongoose } from "mongoose";
// import { DB_NAME } from "./constants";
// import { express } from "express";
// const app = express()



// :: Approach_1, to connect Db
// ?> we can directly create a function, make an iife,
//?> Database also goodApproach, took try-Catch, handled dbError, Async-Await as Db is in another continent(as such it takes some for connection)
// //. ; is used to clean. such that iifes wont get any errors.
// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`)
//         app.on("error", (err)=>{
//             console.log("Unable to connect with Db");
//             throw err
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App listening on port ${process.env.PORT}`);
//         })
//     }
//     catch (err) {
//         console.error("ERROR : ", err)
//     }
// })()