const { profiles, passengers } = require("../models/index");

module.exports = {
	update: async (req, res) => {
		try {
			const data = await profiles.update({
				where: { id: parseInt(req.params.id) },
				data: {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					nationality: req.body.nationality,
					gender: req.body.gender,
					birth: new Date(req.body.birth),
				},
			});

			const checkPassenger = await passengers.findFirst({
				where: { profile_id: data.id },
			});
			if (!checkPassenger) {
				await passengers.create({
					data: {
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						nationality: req.body.nationality,
						gender: req.body.gender,
						birth: new Date(req.body.birth),
						profile_id: data.id,
					},
				});
				return res.status(201).json({
					message: "Success update profile and add passanger",
					data,
				});
			}

			await passengers.update({
				where: { id: checkPassenger.id },
				data: {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					nationality: req.body.nationality,
					gender: req.body.gender,
					birth: new Date(req.body.birth),
				},
			});
			return res.status(201).json({
				message: "Success update profile",
				data,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error,
			});
		}
	},
};
