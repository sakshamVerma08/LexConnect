import LawyerProfile from "../models/LawyerProfile.js";

// Get the profile of either all lawyers in the DB, or query them on basis of specialization, city, state, country
export const getLawyerProfile = async (req, res) => {
  try {
    const { specialization, city, state, country } = req.query;

    const query = {};
    if (specialization) query.specialization = specialization;
    if (city) query.location.city = city;
    if (state) query.location.state = state;
    if (country) query.location.country = country;

    const lawyers = await LawyerProfile.find(query)
      .populate("user", ["name", "email"])
      .sort({ rating: -1 });
    res.json(lawyers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to Fetch Lawyers form DB");
  }
};
