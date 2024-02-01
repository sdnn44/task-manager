"use client"
import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'
import CalendarEvent from './CalendarEvent'

interface ITask {
  title: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  id: string;
}

interface IEventProps {
  event: ITask;
}

const Calendar = () => {

  const { tasks, tasksForCurrentMonth } = useGlobalState();

  return (
    <div className='w-full h-full'>
      {/* <CalendarEvent date={event.date} title={event.title} /> */}
      <CalendarEvent events={tasks} />
    </div>
  )
}

export default Calendar