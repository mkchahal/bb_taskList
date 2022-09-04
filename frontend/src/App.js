import { Button, Modal, Table, Layout, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import { deleteTask } from "./utils/apiUtils";
import { EditModal } from "./components/EditModal";
import { AddModal } from "./components/AddModal";

const { Header } = Layout;
const { Title } = Typography;

const App = () => {
  const { setTitle, setContent, tasks, setTasks, setIsEditing, setIsAdding } =
    useContext(AppContext);

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
      sorter: (a, b) => a.date - b.date,
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
    <Layout>
      <Header>
        <Title style={{color: "white", textAlign: "center", paddingTop: "0.5rem"}}>TO DO LIST</Title>
      </Header>
      <Layout style={{width: "60%", margin: "5rem auto", gap: "2rem"}}>
        <Button type="primary" shape="round" onClick={() => setIsAdding(true)}>
          + Add a new task
        </Button>
        <AddModal />
        <Table columns={columns} dataSource={tasks} />
        <EditModal />
      </Layout>
    </Layout>
  );
};

export default App;
