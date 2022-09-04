import axios from "axios";

export const getAllTasks = async () => {
  try {
    const response = await axios.get("/task");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (title, content) => {
  try {
    const response = await axios.post("/task", {
      title,
      content,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id, title, content) => {
  try {
    const response = await axios.put(`/task/${id}`, {
      title,
      content
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (task) => {
  try {
    const response = await axios.delete(`/task/${task._id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
