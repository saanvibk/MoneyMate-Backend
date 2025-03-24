import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import connectDB from "./Database/connectDB.js";
import auth from "./User/authentication.js"

const app = express()

const corsOptions = {
    credentials: true, // Allow credentials (cookies)
    origin: "http://localhost:3000", // Update with your frontend URL
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser()) //extracts cookie data from the Cookie header from client's each request
app.use(
    session({
      secret: "saanvibk",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 4000000,

      },
  
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',

      }),
    })
  );

app.get("/", (req,res)=>{
    res.send("helo")
})
app.use("/auth", auth)

 
const start = async()=>{
    try {
        await connectDB()
        app.listen(5000, ()=> console.log("Server running at port 5000"))
    } catch (error) {
        console.log(error);
    }

}
start()