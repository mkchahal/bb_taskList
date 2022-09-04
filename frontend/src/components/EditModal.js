import { Input, Modal } from "antd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export const EditModal = () => {
  const { title, setTitle, content, setContent, isEditing, setIsEditing } =
    useContext(AppContext);

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
      onOk={() => {
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
