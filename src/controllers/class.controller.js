const { classes } = require("../models");

module.exports = {
	create: async (req, res) => {
		try {
			const classFlight = await classes.create({
				data: {
					name: req.body.name,
				},
			});

			return res.status(201).json({
				message: "success create classes",
				classFlight,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	update: async (req, res) => {
		try {
			const classFlight = await classes.update({
				where: {
					id: parseInt(req.params.id),
				},
				data: {
					name: req.body.name,
				},
			});

			return res.status(201).json({
				message: "success update classes",
				classFlight,
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},

	getAll: async (res) => {
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
			const data = await classes.delete({
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
