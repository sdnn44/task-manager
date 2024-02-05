"use client"

import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/globalContextProvider'

const page = () => {
  const { completedTasks } = useGlobalState();
  return <Tasks title='Completed tasks' tasks={completedTasks} />;
}

export default page