"use client";
import CreateContent from "./components/Modals/CreateTask";
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalContextProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return <Tasks title="Wszystkie zadania!" tasks={tasks} />;

}
