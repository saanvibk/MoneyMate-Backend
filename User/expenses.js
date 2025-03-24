import User from "../Models/user.js"
import { Router } from "express"

const router = Router()

router.post("/expenses", async (req, res)=>{
    const userid = req.session.userID
    try {
        const amount = req.body
        const user = await User.findOneAndUpdate(
            {_id: userid },
            {$inc: { expenses: amount}}, 
            {new:true})

        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        console.log(user);
        
        return res.status(200).json({msg: `Expense updated ${user}`})
    
    } catch (error) {
        return res.status(400).json({error})
    }
})