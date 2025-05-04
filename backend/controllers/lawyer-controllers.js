import Lawyer from "../models/Lawyer.js";

// Get the profile of all lawyers in DB.
export const getLawyerProfile = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();

    return res.status(200).json({
      data: lawyers,
      success: true,
      message: "Fetched all lawyers from DB",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOneLawyerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID not received" });
    }

    const existingLawyer = await Lawyer.findById(id);

    if (!existingLawyer) {
      return res.status(404).json({ message: "Lawyer Not Found !" });
    }

    return res
      .status(201)
      .json({ message: "Lawyer Found", success: true, data: existingLawyer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
