"use client"

import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/globalContextProvider';

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title='Wazne' tasks={importantTasks} />;
}

export default page