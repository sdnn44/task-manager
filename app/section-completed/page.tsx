"use client"

import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/globalContextProvider'

const page = () => {
  const { completedTasks } = useGlobalState();
  return <Tasks title='Wykonane' tasks={completedTasks} />;
}

export default page