const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);

	return bcrypt.hash(password, salt);
};

const compareSync = async (plainPassword, hashedPassword) => {
	return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
	cryptPassword,
	compareSync,
};
