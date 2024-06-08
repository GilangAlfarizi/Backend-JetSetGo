const { flights } = require("../models");

module.exports = {
	create: async (req, res) => {
		try {
			const {
				code,
				departure_city,
				departure_time,
				arrival_city,
				arrival_time,
				airline,
				airline_image,
				price,
			} = req.body;

			const departureTime = new Date(departure_time);
			const arrivalTime = new Date(arrival_time);

			if (arrivalTime < departureTime) {
				return res.status(400).json({
					error: "arrival_time cannot be earlier than departure_time",
				});
			}

			const flight = await flights.create({
				data: {
					code: code,
					departure_city: departure_city,
					departure_time: departureTime,
					arrival_city: arrival_city,
					arrival_time: arrivalTime,
					airline: airline,
					airline_image: airline_image,
					price: price,
				},
			});

			return res.status(201).json(flight.data);
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
