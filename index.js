const express = require("express");
const { connectDB } = require("./DbConection");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");

require("dotenv").config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
	return res.send("Hello");
});
app.listen(process.env.PORT || 3000, () =>
	console.log("Server is running ", process.env.PORT)
);
