import User from "../Models/user.js";
import { Router } from "express";

const router = Router();

router.post("/expense", async (req, res) => {
  const userid = req.session.userID;
  try {
    const { category, amount } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userid, "expenses.category": category },
      {
        $inc: { "expenses.$.amount": amount },
        $set: { "expenses.$.date": new Date() },
      },
      { new: true }
    );
    console.log("expense added for category", user);

    if (!user) {
      const userWithNewCategory = await User.findByIdAndUpdate(
        userid,
        {
          $push: {
            expenses: {
              category: category,
              amount: amount,
              date: new Date(),
            },
          },
        },
        { new: true }
      );
      console.log("expense:", userWithNewCategory.expenses);

      if (!userWithNewCategory) {
        return res.status(404).json({ error: "User not found" });
      }
    }
    return res.status(200).json({ msg: `Expense updated ${user.expenses}` });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
