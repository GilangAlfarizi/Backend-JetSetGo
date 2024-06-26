const { classes, flights } = require("../models");

module.exports = {
	create: async (req, res) => {
		try {
			const data = await classes.create({
				data: {
					name: req.body.name,
				},
			});

			return res.status(201).json({
				message: "success create classes",
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
			const data = await classes.update({
				where: {
					id: parseInt(req.params.id),
				},
				data: {
					name: req.body.name,
				},
			});

			return res.status(201).json({
				message: "success update classes",
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
			const data = await classes.findMany();

			return res.status(200).json({
				message: "success get many classes",
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
			const data = await classes.findFirst({
				where: {
					id: parseInt(req.params.id),
				},
			});

			await flights.deleteMany({
				where: { class_id: data.id },
			});

			const result = await classes.delete({ where: { id: data.id } });
			if (!result) {
				return res.status(404).json({ message: "Fail to delete class" });
			}

			return res.status(204).json({
				message: "Success delete a class",
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
