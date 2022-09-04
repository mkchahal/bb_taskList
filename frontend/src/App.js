import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const dataSource = [...tasks].map(
    (task) => (task.date = task.date.slice(0, 10))
  );
  const columns = [
    {
      key: 1,
      title: "Title",
      dataIndex: "title",
    },
    {
      key: 2,
      title: "Content",
      dataIndex: "content",
    },
    {
      key: 3,
      title: "Date",
      dataIndex: "date",
    },
    {
      key: 4,
      title: "Actions",
      render: (task) => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined
              onClick={() => handleDelete(task)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

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

  const handleDelete = (task) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        axios
          .delete(`/task/${task._id}`)
          .then((res) => {
            const newArr = [...tasks].filter((task) => task._id !== res.data._id);
            setTasks(newArr);
          })
          .catch((err) => console.error(err));
      }
    })
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
      </form>
      <Button type="onClick">+ Add a new task</Button>
      <Table columns={columns} dataSource={tasks} />
    </>
  );
};

export default App;
