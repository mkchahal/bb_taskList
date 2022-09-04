import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/task")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error(err.message));
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
