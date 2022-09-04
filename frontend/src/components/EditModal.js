import { Input, Modal, message, Form } from "antd";
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

  const handleSubmission = async () => {
    if (!title || !content)
      return message.error("All the fields are required.", 2);
    const res = await updateTask(id, title, content);
    const newArr = [...tasks].map((obj) =>
      obj._id === res.data._id ? res.data : obj
    );
    setTasks(newArr);
    resetEditing();
  };

  return (
    <Modal
      title="Edit Task"
      visible={isEditing}
      onCancel={() => resetEditing()}
      okText="Save"
      onOk={handleSubmission}
    >
      <Form labelCol={{ span: 4 }}>
        <Form.Item label="Title" required>
          <Input
            value={title}
            placeholder="Task"
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Content" required>
          <Input
            value={content}
            placeholder="Additional Notes..."
            onChange={(event) => setContent(event.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
