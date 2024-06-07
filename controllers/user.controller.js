const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports.userRegister = expressAsyncHandler(async (req, res) => {
	try {
		const { userName, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			userName,
			password: hashedPassword,
		});
		const token = jwt.sign(
			{ userId: createdUser._id },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);
		createdUser.token = token;

		await createdUser.save();
		return res.status(201).json({
			status: true,
			message: "User created successfully",
			response: createdUser,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});

module.exports.userLogin = expressAsyncHandler(async (req, res) => {
	try {
		console.log("thissi",req.body)
		const { userName, password } = req.body;

		if (!userName || !password) {
			return res
				.status(400)
				.json({
					status: false,
					message: " userName or password required",
					response: "",
				});
		}

		const finduserName = await User.findOne({ userName });
		if (!finduserName) {
			return res
				.status(400)
				.json({ status: false, message: "Invalid userName", response: "" });
		}
		const passwordMatch = await bcrypt.compare(
			password,
			finduserName?.password
		);
		if (!passwordMatch) {
			return res
				.status(401)
				.json({ status: false, message: "Authentication failed" });
		}
		const token = jwt.sign(
			{ userId: finduserName._id },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);
		finduserName.token = token;
		await finduserName.save();
		return res.status(200).json({
			status: true,
			message: "logged in",
			response: finduserName,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});
