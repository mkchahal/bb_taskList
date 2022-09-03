const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasksRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8081;
const MONGODB_URI = process.env.MONGODB_URI;

/* Connecting Database */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error connecting with database: ${error}`);
  }
};

connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Server Routes */
app.use("/task", tasksRoutes);

/* Start Server */
app.listen(PORT, () => console.log(`Server listening at ${PORT} 🚀`));
