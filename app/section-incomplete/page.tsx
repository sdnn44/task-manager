"use client"
import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/globalContextProvider';

const page = () => {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title='Pending tasks' tasks={incompleteTasks} />;
}

export default page