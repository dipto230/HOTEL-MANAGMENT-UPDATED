import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, contact, address, city } = req.body;   // ✅ now using contact

    // Clerk puts auth.userId in req.auth.userId
    if (!req.auth || !req.auth.userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Find user by Clerk ID (string _id)
    const user = await User.findOne({ _id: req.auth.userId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Create hotel
    const hotel = await Hotel.create({
      owner: user._id,  // ✅ Clerk user id
      name,
      contact,          // ✅ matches schema
      address,
      city,
    });

    res.json({ success: true, message: "Hotel registered successfully", hotel });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
