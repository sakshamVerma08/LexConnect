import Case from "../models/Case.js";
import User from "../models/User.js";

export const createClientCase = async (req, res) => {
  try {
    const id = req.params.clientId;
    if (!id) {
      return res.status(403).json({ message: "ID not found for client" });
    }

    const client = await User.findById(id);
    if (!client) {
      return res.status(403).json({ message: "Client not found with this id" });
    }

    const { title, description, category, type, status, budget } = req.body;

    if (!title || !description || !category || !type || !status || !budget) {
      return res
        .status(403)
        .json({ message: "All required fields are not provided" });
    }

    const newCase = new Case({
      client: id,
      title,
      description,
      category,
      type,
      budget: type === "paid" ? budget : 0,
      status,
    });

    const savedCase = await newCase.save();
    if (!savedCase) {
      return res.status(403).json({ message: "Case couldn't be saved" });
    }

    client.cases.push(newCase._id);
    await client.save();

    return res.status(200).json({
      message: "Case has been created",
      succcess: true,
      data: savedCase,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getClientCases = async (req, res) => {
  try {
    const id = req.params.clientId;
    if (!id) {
      return res.status(403).json({ message: "ID not received for client" });
    }

    const cases = Case.find({ client: id });
    if (!cases) {
      return res
        .status(404)
        .json({ message: "No cases found for this client" });
    }

    return res.status(200).json({
      message: "Cases Fetched successfully",
      success: true,
      data: cases,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
