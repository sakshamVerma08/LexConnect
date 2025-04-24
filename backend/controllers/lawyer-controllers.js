import Lawyer from "../models/Lawyer.js";

// Get the profile of either all lawyers in the DB, or query them on basis of specialization, city, state, country
export const getLawyerProfile = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();

    return res
      .status(200)
      .json({
        data: lawyers,
        success: true,
        message: "Fetched all lawyers from DB",
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
