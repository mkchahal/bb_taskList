import { Modal, Space, Typography } from "antd";
import { AppContext } from "../context/AppContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { getTask } from "../utils/apiUtils";
import { updateDateFormat } from "../utils/conversionUtils";

const { Text } = Typography;

export const ViewModal = ({ id, setId }) => {
  const { isViewing, setIsViewing } = useContext(AppContext);
  const [activeTask, setActiveTask] = useState({});

  const getActiveTask = useCallback(async () => {
    if (id) {
      const res = await getTask(id);
      const taskObj = Object.assign(
        res.data,
        { createdAt: updateDateFormat(res.data.createdAt) },
        { updatedAt: updateDateFormat(res.data.updatedAt) }
      );
      setActiveTask(taskObj);
    }
  }, [id]);

  useEffect(() => {
    isViewing && getActiveTask();
  }, [getActiveTask, isViewing]);

  return (
    <Modal
      title={activeTask.title}
      visible={isViewing}
      onCancel={() => {
        setId(null);
        setIsViewing(false);
      }}
      footer={null}
    >
      <Space direction="vertical">
        <Text>
          <Text strong underline>
            Notes
          </Text>
          : {activeTask.content}
        </Text>
        <Text type="secondary">
          <Text>Last Updated</Text>: {activeTask.updatedAt}
        </Text>
        <Text type="secondary">
          <Text>Posted On</Text>: {activeTask.createdAt}
        </Text>
      </Space>
    </Modal>
  );
};
