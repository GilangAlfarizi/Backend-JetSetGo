const { passengers } = require("../models");

module.exports = {
  createPassenger: async (req, res) => {
    try {
      const newPassenger = await passengers.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          nationality: req.body.nationality,
          gender: req.body.gender,
          birth: req.body.birth,
          baggage: req.body.baggage,
          profile_id: req.body.profile_id,
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

  getAllPassengersByProfileID: async (req, res) => {
    try {
      const profileId = parseInt(req.params.profile_id, 10);

      const passengersByProfileID = await passengers.findMany({
        where: {
          profile_id: profileId,
        },
      });

      if (passengersByProfileID.length === 0) {
        return res.status(404).json({
          error:
            "No passengers exist, you need to create atleast one passenger",
        });
      }

      return res.status(200).json({
        data: passengersByProfileID,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error getting passengers",
        error: error.message,
      });
    }
  },
};
