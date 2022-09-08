import { Input, Modal, message, Form } from "antd";
import { AppContext } from "../context/AppContext";
import { useCallback, useContext } from "react";
import { addTask } from "../utils/apiUtils";

export const AddModal = () => {
  const {
    title,
    setTitle,
    tasks,
    setTasks,
    content,
    setContent,
    isAdding,
    setIsAdding,
  } = useContext(AppContext);

  const resetAdding = useCallback(() => {
    setIsAdding(false);
    setTitle("");
    setContent("");
  }, [setIsAdding, setTitle, setContent]);

  const handleSubmission = async () => {
    if (!title || !content)
      return message.error("All the fields are required.", 2);
    const res = await addTask(title, content);
    setTasks([res.data, ...tasks]);
    resetAdding();
  };

  return (
    <Modal
      title="Add Task"
      visible={isAdding}
      onCancel={resetAdding}
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
