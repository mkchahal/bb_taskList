import axios from "axios";

export const deleteTask = async (task) => {
    try {
        const response = await axios.delete(`/task/${task._id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

