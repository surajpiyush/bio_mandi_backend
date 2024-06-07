const express = require("express");
const {
	createTask,
	updateTask,
	getTask,
	deleteTask,
	getAllTask,
} = require("../controllers/task.controller");
const verifyToken = require("../middlewares/jwt");
const taskRouter = express.Router();

taskRouter.post("/createTask", verifyToken, createTask);
taskRouter.put("/updateTask/:id", verifyToken, updateTask);
taskRouter.get("/getTask/:id", verifyToken, getTask);
taskRouter.get("/getAllTask", verifyToken, getAllTask);
taskRouter.delete("/deleteTask/:id", verifyToken, deleteTask);

module.exports = taskRouter;
