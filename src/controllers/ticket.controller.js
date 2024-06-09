const { tickets } = require("../models");

module.exports = {
	getAll: async (req, res) => {
		try {
			const data = await tickets.findMany();

			return res.status(200).json({
				message: "success get many tickets",
				data,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	getDetail: async (req, res) => {
		try {
			const data = await tickets.findUnique({
				where: {
					id: parseInt(req.params.id),
				},
			});

			return res.status(200).json({
				message: "success get ticket detail",
				data,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	delete: async (req, res) => {
		try {
			const data = await tickets.delete({
				where: {
					id: parseInt(req.params.id),
				},
			});

			if (!data) {
				throw new Error("fail to delete class");
			}

			return res.status(204).json();
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
