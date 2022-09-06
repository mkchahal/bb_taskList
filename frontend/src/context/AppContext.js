import { createContext, useEffect, useState } from "react";
import { getAllTasks } from "../utils/apiUtils";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const setTasksList = async () => {
    const res = await getAllTasks();
    setTasks(res.data); 
  }

  useEffect(() => {
    setTasksList();
  }, []);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        tasks,
        setTasks,
        isEditing,
        setIsEditing,
        isAdding, 
        setIsAdding,
        isViewing, 
        setIsViewing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
