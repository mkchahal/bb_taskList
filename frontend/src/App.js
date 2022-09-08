import { Button, Modal, Table, Layout, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "./context/AppContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { deleteTask } from "./utils/apiUtils";
import { EditModal } from "./components/EditModal";
import { AddModal } from "./components/AddModal";
import { ViewModal } from "./components/ViewModal";
import { updateDateFormat } from "./utils/conversionUtils";

const { Header } = Layout;
const { Title } = Typography;

const App = () => {
  const {
    setTitle,
    setContent,
    tasks,
    setTasks,
    setIsEditing,
    setIsAdding,
    setIsViewing,
  } = useContext(AppContext);
  const [list, setList] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState("");

  useEffect(() => {
    const listItems = [...tasks];
    listItems.map((item) => {
      return Object.assign(
        item,
        {date: updateDateFormat(item.updatedAt)},
        {key: item._id }
      );
    });
    setList(listItems);
  }, [tasks]);

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
      sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    },
    {
      key: 4,
      title: "Actions",
      render: (task) => {
        return (
          <>
            <EditOutlined
              onClick={(event) => {
                event.stopPropagation();
                handleEditTask(task);
              }}
            />
            <DeleteOutlined
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteTask(task);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const handleDeleteTask = useCallback((task) => {
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
  }, [tasks, setTasks]);

  const handleEditTask = useCallback((task) => {
    setIsEditing(true);
    setTitle(task.title);
    setContent(task.content);
    setActiveTaskId(task._id);
  }, [setIsEditing, setTitle, setContent]);

  return (
    <Layout>
      <Header>
        <Title
          style={{ color: "white", textAlign: "center", paddingTop: "0.5rem" }}
        >
          TO DO LIST
        </Title>
      </Header>
      <Layout style={{ margin: "5rem auto", gap: "2rem", minWidth: "60%" }}>
        <AddModal />
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          onRow={(task) => {
            return {
              onClick: () => {
                setActiveTaskId(task._id);
                setIsViewing(true);
              },
            };
          }}
        />
        <ViewModal id={activeTaskId} setId={setActiveTaskId}/>
        <Button type="primary" shape="round" onClick={() => setIsAdding(true)}>
          + Add a new task
        </Button>
        <EditModal id={activeTaskId} />
      </Layout>
    </Layout>
  );
};

export default App;
