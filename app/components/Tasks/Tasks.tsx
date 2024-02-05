"use client"
import { useGlobalState } from '@/app/context/globalContextProvider'
import { plus } from '@/app/utils/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import CreateTask from '../Modals/CreateTask'
import Modal from '../Modals/Modal'
import TaskItem from '../TaskItem/TaskItem'
import { search } from '@/app/utils/icons';
import EditTask from '../Modals/EditTask'

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const { theme, openModal, modal, modalContent, closeModal, isLoading } = useGlobalState();

  const filteredTasksByName = tasks.filter(task =>
    task.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <TasksStyled theme={theme}>
      {modal && <Modal content={<CreateTask />} />}
      {/* {modal && modalContent === 'EditTask' && <Modal content={<EditTask />}  />} */}
      <div className="header-container flex items-center">
        <h1>{title}</h1>

        <Search theme={theme}>
          {search}
          <input
            type="text"
            placeholder="Search for task..."
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </Search>

        <button
          className="flex items-center ml-5"
          onClick={openModal}
        >
          {plus}
        </button>
      </div>
      <div className="tasks grid">
        {filteredTasksByName.map((task) => (
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
          Add new task
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
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  overflow-y: auto;

  .tasks {
    margin: 2rem 0;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .header-container > h1 {
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
      background: ${(props) => props.theme.colorDanger};
      border-radius: .5rem;
    }
  }

  .header-container i {
      font-size: 2rem;
      cursor: pointer;
      transition: .3s ease-in-out;

      &:hover {
      color: ${(props) => props.theme.colorGrey2};
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

    border: 2px dashed ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    transition: .3s ease;

    &:hover {
      background: ${(props) => props.theme.colorBgTask};
      color: ${(props) => props.theme.colorGrey0};
    }
  }

  @media screen and (max-width: 530px) { 
    .header-container i {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 450px) { 
    .header-container > h1 {
      font-size: 1rem;
    }
    .header-container i {
      font-size: 1rem;
    }
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  /* margin: 0 auto; */
  margin-left: auto;
  width: 40%;
  background-color: rgb(31,38,49);
  border-radius: 15px; 

  input {
    border: none;
    outline: none;
    background-color: rgb(31,38,49);
    color: #fff;
  }

  i {
    padding: .8rem;
    color: ${(props) => props.theme.colorCompleted};
  }

  @media screen and (max-width: 1250px) {
    width: 50%;
  }

  @media screen and (max-width: 1040px) {
    width: 60%;
  }

  @media screen and (max-width: 930px) {
      input {
        width: 50%;
      }
      i {
        font-size: 1.2rem !important;
      }
  }

  @media screen and (max-width: 800px) {
      width: 50%;
      font-size: .8rem;
  }

  @media screen and (max-width: 530px) { 
    i {
      padding: .5rem;
      font-size: 1rem !important;
    }
  }

  @media screen and (max-width: 450px) {
    width: 40%;
  }
`;
export default Tasks