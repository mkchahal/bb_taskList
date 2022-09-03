import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./components/Task";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/task")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/task", {
        title,
        content,
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTitle("");
        setContent("");
      });
  };

  return (
    <>
      <h1>To Do List</h1>
      <form action="submit" onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a Task..."
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Add some related notes..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button type="submit">+ Add a new task</button>
      </form>
      <table>
        <tr>
          <th>Task</th>
          <th>Content</th>
          <th>Date</th>
        </tr>
        {tasks &&
          tasks.map((task) => {
            return <Task task={task} />;
          })}
      </table>
    </>
  );
}

export default App;
