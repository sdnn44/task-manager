"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import themes from "./themes";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [tasks, setTasks] = useState([]);

  const changeTheme = () => {
    if(selectedTheme == 0)
      setSelectedTheme(1);
    else setSelectedTheme(0);
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  }

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      toast.error("Proba wyswietlenia zadan nie powiodla sie.");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Pomyslnie usunieto zadanie.");
      getAllTasks();
    } catch (error) {
      toast.error("Proba usuniecia zadania nie powiodla sie.");
    }
  };

  const editTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Pomyslnie zedytowano zadanie.");
      getAllTasks();
    } catch (error) {
      toast.error("Proba edycji zadania nie powiodla sie.");
    }
  };
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant === true);

  const percentageOfSuccessful = () => {
    const value = (completedTasks.length/tasks.length)*100;
    return value;
  }

  React.useEffect(() => {
    if (user) getAllTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        changeTheme,
        tasks,
        getAllTasks,
        deleteTask,
        editTask,
        completedTasks,
        incompleteTasks,
        importantTasks,
        percentageOfSuccessful,
        isLoading,
        modal,
        openModal,
        closeModal,
        collapsed,
        collapseMenu
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
