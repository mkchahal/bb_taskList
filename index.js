const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const tasksRoutes = require('./routes/tasksRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 8081;
const MONGODB_URI = process.env.MONGODB_URI;

/* MongoDB */
mongoose.connect(MONGODB_URI).then(() => {
    console.log(`MongoDB Connected`)
}).catch(err => {
    console.log(`Error connecting with database: ${err}`);
});

/* Middleware */
app.use(cors());
app.use(express.json());

/* Server Routes */
app.use('/task', tasksRoutes);

// Static serve HTML (Server side routing)
app.use(express.static(path.join(__dirname, 'public')));

/* Start Server */
app.listen(PORT, () => console.log(`Server listening at ${PORT} 🚀`));