const { passengers } = require("../models");

module.exports = {
  createPassenger: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        nationality,
        gender,
        birth,
        baggage,
        profile_id,
      } = req.body;

      const newPassenger = await passengers.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          nationality: nationality,
          gender: gender,
          birth: birth,
          baggage: baggage,
          profile_id: profile_id,
        },
      });

      return res.status(201).json({
        message: "Passenger created",
        passenger: newPassenger,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating passenger",
        error: error.message,
      });
    }
  },

  getAllUserPassengers: async (req, res) => {
    try {
      const profileId = parseInt(req.params.profile_id, 10);

      const userPassengers = await passengers.findMany({
        where: {
          profile_id: profileId,
        },
      });

      return res.status(200).json({
        data: userPassengers,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error getting passengers",
        error: error.message,
      });
    }
  },
};
