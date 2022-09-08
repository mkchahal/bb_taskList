const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  const { sortByDate } = req.query;
  const obj = {};

  if (sortByDate) {
    const value = sortByDate === "desc" ? -1 : 1;
    obj.createdAt = value;
  }

  try {
    const tasks = await Task.find().sort(obj);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const addTask = async (req, res) => {
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
    if (!task)
      return res
        .status(400)
        .json({ Error: "No entry found with the given id." });
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const editTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    res.json(task);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { getAllTasks, addTask, getTask, editTask, deleteTask };
