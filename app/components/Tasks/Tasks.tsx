"use client"
import { useGlobalState } from '@/app/context/globalContextProvider'
import { plus } from '@/app/utils/icons'
import React from 'react'
import styled from 'styled-components'
import CreateContent from '../Modals/CreateTask'
import Modal from '../Modals/Modal'
import TaskItem from '../TaskItem/TaskItem'

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { theme, openModal, modal, isLoading } = useGlobalState();

  return (
    <TasksStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id} />
        ))}
        <button
          className="create-task"
          onClick={openModal}
        >
          {plus}
          Dodaj nowe zadanie
        </button>
      </div>
    </TasksStyled>
  )
}

const TasksStyled = styled.main`
  height: 100%;
  width: 100%;

  padding: 2rem;

  background: ${(props) => props.theme.colorBg2};

  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  .tasks {
    margin: 2rem 0;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: .5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    font-weight: 600;
    color: ${(props) => props.theme.colorGrey2};
    cursor: pointer;

    border: 3px dashed ${(props) => props.theme.colorGrey5};
    border-radius: 1rem;

    transition: .3s ease;

    &:hover {
      background: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
export default Tasks