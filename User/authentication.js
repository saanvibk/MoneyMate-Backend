import { Router } from "express";
import User from "../Models/user.js";
import bcryptjs from 'bcryptjs';

const router = Router()

router.post("/signup", async (req, res)=>{
    let {username, email, password } = req.body
    try {
        const findUser = await User.findOne({email})

        if (findUser) {
            return res.status(400).json({msg:"User already exists"})
        }   
    
        const salt = bcryptjs.genSaltSync(10)
        password = bcryptjs.hashSync(password, salt)

        const user = new User({username, email, password})

        const savedUser = await user.save()
        console.log(savedUser);

        // req.session.visited = true;  
        req.session.userID = savedUser._id;
        console.log("Session User:", req.session);

        return res.status(200).json({userid: savedUser._id})
    } catch (error) {
        return res.status(400).json({msg:"Error while saving user"})
    } 
    
    
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: "User not found, pls signup"})
        }
        const isPasswordValid = bcryptjs.compareSync(password, user.password)
        if (!isPasswordValid){
            return res.status(400).json({msg: "Incorrect password"})
        }
        req.session.visited = true;
        req.session.user = user._id;
        console.log("Login successful, Session User:", req.session.user);

        return res.status(200).json({user})

    } catch (error) {
        return res.status(400).json({msg: "Erro while finding user"})

    }
})

export default router