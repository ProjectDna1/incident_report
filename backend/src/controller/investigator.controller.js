import User from "../models/User.js";

export const getInvestigators = async (req, res) => {
  try {
    const investigators = await User.find({ role: "investigator" })
      .select("-password")
      .sort({ fullName: 1 });

    res.status(200).json({ investigators });
  } catch (error) {
    console.error("Error getting investigators:", error);
    res.status(500).json({ message: "Failed to get investigators" });
  }
};