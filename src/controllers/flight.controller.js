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

	update: async (req, res) => {
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

			const data = await flights.update({
				where: { id: parseInt(req.params.id) },
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
				message: "Success update flight",
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

	getSearchedFlight: async (req, res) => {
		try {
			const { from, to, classFlight, departure_time } = req.query;
			const filter = {};

			if (from) {
				filter.departure_city = { contains: from };
			}
			if (to) {
				filter.arrival_city = { contains: to };
			}
			if (classFlight) {
				filter.class_id = parseInt(classFlight);
			}
			if (departure_time) {
				const formatDate = new Date(departure_time).toISOString().slice(0, 10);
				// filter.departure_time = new Date(departure_time);
				filter.departure_time = {
					gte: formatDate + "-01-01T00:00:00.000Z",
					lte: formatDate + "-30-23:59:59.999Z",
				};
			}
			filter.departure_time.slice(0, 10);
			console.log(departure_time);
			console.log(filter.departureTime);

			const data = await flights.findMany({
				where: filter,
			});

			return res.status(200).json({
				message: "Success get searched flights",
				data,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
