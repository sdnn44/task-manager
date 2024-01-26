"use client"
import { useGlobalState } from '@/app/context/globalContextProvider'
import { plus } from '@/app/utils/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import CreateContent from '../Modals/CreateTask'
import Modal from '../Modals/Modal'
import TaskItem from '../TaskItem/TaskItem'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { search } from '@/app/utils/icons';

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const { theme, openModal, modal, isLoading } = useGlobalState();

  return (
    <TasksStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <div className="header-container flex justify-between items-center">
        <h1>{title}</h1>

        <Search theme={theme}>
          {search}
          <input
            type="text"
            placeholder="Wyszukaj zadanie..."
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
`;
export default Tasks