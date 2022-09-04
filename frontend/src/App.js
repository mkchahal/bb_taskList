import { Button, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import { deleteTask } from "./utils/apiUtils";
import { EditModal } from "./components/EditModal";
import { AddModal } from "./components/AddModal";

const App = () => {
  const {
    setTitle,
    setContent,
    tasks,
    setTasks,
    setIsEditing,
    setIsAdding,
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

  const handleEditTask = (task) => {
    setIsEditing(true);
    setTitle(task.title);
    setContent(task.content);
  };

  return (
    <>
      <Button onClick={() => setIsAdding(true)}>+ Add a new task</Button>
      <AddModal/>
      <Table columns={columns} dataSource={tasks} />
      <EditModal/>
    </>
  );
};

export default App;
