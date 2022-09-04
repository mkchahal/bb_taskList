const express = require("express");
const app = express();
const cors = require("cors");
const tasksRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");

require("dotenv").config();

const PORT = process.env.PORT || 8081;

/* Connecting Database */
connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Server Routes */
app.use("/task", tasksRoutes);

/* Start Server */
app.listen(PORT, () => console.log(`Server listening at ${PORT} 🚀`));
