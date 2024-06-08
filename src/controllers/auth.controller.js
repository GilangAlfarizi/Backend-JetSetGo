const { users } = require("../models");
const { cryptPassword } = require("../utils");

module.exports = {
	register: async (req, res) => {
		const user = await users.create({
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

		return res.json({
			data: user,
		});
	},

	login: async (req, res) => {
		findUser = await users.findFirst({
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
				data: {
					token,
				},
			});
		}

		return res.status(403).json({
			error: "invalid credentials",
		});
	},
};
