import User from "../models/user.js";
const creatCurrentUser = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error in creatCurrentUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default {
    creatCurrentUser,
};
//# sourceMappingURL=MyUserCrontroller.js.map