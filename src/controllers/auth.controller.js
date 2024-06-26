const { users, profiles } = require("../models");
const { cryptPassword, compareSync } = require("../utils");
const jwt = require("jsonwebtoken");

module.exports = {
	register: async (req, res) => {
		try {
			const data = await users.create({
				data: {
					username: req.body.username,
					email: req.body.email,
					password: await cryptPassword(req.body.password),
					profile: {
						create: {
							email: req.body.email,
						},
					},
				},
			});

			return res.status(201).json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error,
			});
		}
	},

	login: async (req, res) => {
		try {
			const findUser = await users.findFirst({
				where: {
					email: req.body.email,
				},
			});

			if (!findUser) {
				return res.status(404).json({
					error: "User not exist",
				});
			}

			if (compareSync(req.body.password, findUser.password)) {
				const token = jwt.sign({ id: findUser.id }, "secret_key", {
					expiresIn: "6h",
				});

				return res.status(200).json({
					user_id: findUser.id,
					token,
				});
			}

			return res.status(403).json({
				error: "invalid credentials",
			});
		} catch (error) {
			return res.status(500).json({
				error,
			});
		}
	},
};
