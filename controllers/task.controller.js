const express = require("express");
const taskRouter = express.Router();
const asyncHandler = require("express-async-handler");
const Task = require("../models/task.model");
const { default: mongoose } = require("mongoose");

module.exports.createTask = asyncHandler(async (req, res) => {
	const userId = req.userId;
	console.log("this sjkwdje", req.body, userId);
	try {
		const { title, description, status } = req.body;

		if (!title || !description) {
			return res.status(400).json({
				status: false,
				message: "Title and description are required",
				response: "",
			});
		}
		console.log("agdhsg");
		const createdTask = await Task.create({
			title,
			description,
			status,
			userId,
		});
		console.log("thqhdj", createdTask);
		return res.status(201).json({
			status: true,
			message: "Task created successfully",
			response: createdTask,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});

module.exports.updateTask = asyncHandler(async (req, res) => {
	const userId  = req.userId;

	try {
		const { id } = req.params;
		const { title, description, status } = req.body;

		if (!title || !description || !status) {
			return res.status(400).json({
				status: false,
				message: "Title, description, and status are required",
				response: "",
			});
		}

		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{ title, description, status, userId },
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json({
				status: false,
				message: "Task not found",
				response: "",
			});
		}

		return res.status(200).json({
			status: true,
			message: "Task updated successfully",
			response: updatedTask,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});

module.exports.deleteTask = asyncHandler(async (req, res) => {
	
	try {
		const { id } = req.params;
console.log("this is id",id)
		const deletedTask = await Task.findByIdAndDelete(id);

		if (!deletedTask) {
			return res.status(404).json({
				status: false,
				message: "Task not found",
				response: "",
			});
		}

		return res.status(200).json({
			status: true,
			message: "Task deleted successfully",
			response: "",
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});

module.exports.getTask = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;

		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).json({
				status: false,
				message: "Task not found",
				response: "",
			});
		}

		return res.status(200).json({
			status: true,
			message: "Task retrieved successfully",
			response: task,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});

module.exports.getAllTask = asyncHandler(async (req, res) => {
	try {
		const  userId  = req.userId;
		console.log(userId)
		const findAllTask = await Task.find({userId});

		return res.status(200).json({
			status: true,
			message: "All Task",
			response: findAllTask,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});
