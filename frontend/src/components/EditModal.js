import { Input, Modal } from "antd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { updateTask } from "../utils/apiUtils";

export const EditModal = ({ id }) => {
  const {
    tasks,
    setTasks,
    title,
    setTitle,
    content,
    setContent,
    isEditing,
    setIsEditing,
  } = useContext(AppContext);

  const resetEditing = () => {
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  return (
    <Modal
      title="Edit Task"
      visible={isEditing}
      onCancel={() => resetEditing()}
      okText="Save"
      onOk={async () => {
        const res = await updateTask(id, title, content);
        const newArr = [...tasks];
        console.log(res.data)
        newArr.map((obj) => (obj._id === res.data._id ? res.data : obj));
        console.log(newArr);
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
  );
};
