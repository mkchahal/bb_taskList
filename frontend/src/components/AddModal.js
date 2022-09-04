import { Input, Modal } from "antd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
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

  const resetAdding = () => {
    setIsAdding(false);
    setTitle("");
    setContent("");
  };

  return (
    <Modal
      title="Add Task"
      visible={isAdding}
      onCancel={() => resetAdding()}
      okText="Save"
      onOk={async () => {
        const res = await addTask(title, content);
        setTasks([res.data, ...tasks]);
        resetAdding();
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
