import { Button, Input, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import { addTask, deleteTask } from "./utils/apiUtils";

const App = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    tasks,
    setTasks,
    isEditing,
    setIsEditing,
  } = useContext(AppContext);

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
            <EditOutlined onClick={() => handleEditTask(task)} />
            <DeleteOutlined
              onClick={() => handleDeleteTask(task)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const handleDeleteTask = (task) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await deleteTask(task);
        const newArr = [...tasks].filter((task) => task._id !== res.data._id);
        setTasks(newArr);
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const response = addTask(title, content);
    setTasks([...tasks, response.data]);

    setTitle("");
    setContent("");
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setTitle(task.title);
    setContent(task.content);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <Button type="onClick">+ Add a new task</Button>
      <Table columns={columns} dataSource={tasks} />
      <Modal
        title="Edit Task"
        visible={isEditing}
        onCancel={() => resetEditing()}
        okText="Save"
        onOk={(task) => {
          console.log(task);
          resetEditing();
        }}
      >
        <Input
          value={title}
          placeholder="Task"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          value={content}
          placeholder="Additional Notes..."
          onChange={(event) => setContent(event.target.value)}
        />
      </Modal>
    </>
  );
};

export default App;
