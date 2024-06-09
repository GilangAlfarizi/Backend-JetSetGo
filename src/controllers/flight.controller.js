const { flights } = require("../models");
const { priceToIDR } = require("../utils/index");

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
				class_id,
			} = req.body;

			const departureTime = new Date(departure_time);
			const arrivalTime = new Date(arrival_time);

			if (arrivalTime < departureTime) {
				return res.status(400).json({
					message: "arrival_time cannot be earlier than departure_time",
				});
			}

			const data = await flights.create({
				data: {
					code: code,
					departure_city: departure_city,
					departure_time: departureTime,
					arrival_city: arrival_city,
					arrival_time: arrivalTime,
					airline: airline,
					airline_image: airline_image,
					price: price,
					class_id: class_id,
				},
			});

			return res.status(201).json({
				message: "Success create flight",
				data,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	getAll: async (req, res) => {
		try {
			const data = await flights.findMany({
				select: {
					id: true,
					airline_image: true,
					departure_city: true,
					arrival_city: true,
					airline: true,
					departure_time: true,
					arrival_time: true,
					price: true,
					class_id: true,
				},
			});
			const formattedData = data.map((flight) => ({
				...flight,
				price: priceToIDR(flight.price),
			}));

			return res.status(200).json({
				message: "success get many flights",
				data: formattedData,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	getDetail: async (req, res) => {
		try {
			const data = await flights.findUnique({
				where: {
					id: parseInt(req.params.id),
				},
			});

			return res.status(200).json({
				message: "success get flight detail",
				data,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
