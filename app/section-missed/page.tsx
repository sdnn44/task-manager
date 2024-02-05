"use client";
import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/globalContextProvider';

const page = () => {
    const { missedTasks } = useGlobalState();
    return <Tasks title='Missed tasks' tasks={missedTasks} />;

}

export default page