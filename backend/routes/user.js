import { Router } from "express";
import User from "../models/user.js";

export const userRouter = new Router()

// Get all users
userRouter.get("/", async (req, res, next) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
    // Pass error to middleware which we created the file (middleware.js)
      next(error)
    }
});

// Get user by ID
userRouter.get("/:id", async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).send("User not found")
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
});

// Create a new user
userRouter.post("/", async (req, res, next) => {
    try {
      const newUser = await User.create(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
});

// Delete user by ID
userRouter.delete("/:id", async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      if (!deletedUser) return res.status(404).send("User not found")
      res.status(204).send("Deleted Successfully")
    } catch (error) {
      next(error)
    }
});