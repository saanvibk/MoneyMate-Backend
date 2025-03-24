import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({path:"./Database/.env"})

const connectionString = process.env.MONGO_URI

const connectDB = ()=>{
    
    return(

        mongoose.connect(connectionString, {
            ssl: true
        }).then(()=> console.log("Connected"))
        .catch((error)=> console.log(error)
        )
    )
}

export default connectDB