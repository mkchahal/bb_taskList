const Task = require("../models/task");

const getAllTasks = async (_req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const addTask = async (req, res) => {
  const { title } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ Error: "Incorrect request body. Title required." });

  try {
    const task = await new Task(req.body).save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId });
    if(!task) return res.status(400).json({Error: "No entry found with the given id."})
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};

const editTask = async (req, res) => {
  const taskId = req.params.id;
  const { title } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ Error: "Incorrect request body. Title required." });

  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: "Error updating the task." });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: "Error deleting the task." });
  }

};

module.exports = { getAllTasks, addTask, getTask, editTask, deleteTask };
