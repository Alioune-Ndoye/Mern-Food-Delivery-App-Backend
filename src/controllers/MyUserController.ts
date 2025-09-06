import { Request, Response } from "express";
import User from "../models/user.js";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ auth0Id: req.auth0Id });
    
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name, addressLine1, city, country } = req.body;

    if (!auth0Id || !email) {
      return res.status(400).json({ message: "auth0Id and email are required" });
    }

    // Check if user exists
    let existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user
    const newUser = new User({
      auth0Id,
      email,
      name,
      addressLine1,
      city,
      country,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in createCurrentUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;

    const user = await User.findOneAndUpdate(
      { auth0Id: req.auth0Id },
      { name, addressLine1, city, country },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    

    res.json(user);
  } catch (error) {
    console.error("Error in updateCurrentUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
