"use client";

import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'
import styled from 'styled-components';
import formatDate from '@/app/utils/format-date';
import Options from '../MoreOptions/Options';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
}

const TaskItem = ({ title, description, date, isCompleted, id }: Props) => {
    const { theme, editTask } = useGlobalState();
    // const { title, description, date, completed, important } = task;
    return (
        <TaskItemStyled theme={theme}>
            <div className="task-header flex justify-between items-center">
                <h1>{title}</h1>
                <p className='date'>
                    {formatDate(date)}
                </p>
            </div>
            <p>{description}</p>
            <div className="task-footer">
                {isCompleted ? (
                    <button
                        className='completed'
                        onClick={() => {
                            const task = {
                                id,
                                isCompleted: !isCompleted,
                            };
                            editTask(task);
                        }}>
                        Ukończono
                    </button>
                ) : (
                    <button
                        className='incomplete'
                        onClick={() => {
                            const task = {
                                id,
                                isCompleted: !isCompleted,
                            };
                            editTask(task);
                        }}>
                        Nie ukończono</button>
                )}
                <div>
                    <Options
                        title={title}
                        description={description}
                        date={date}
                        isCompleted={isCompleted}
                        id={id} />
                </div>
            </div>
        </TaskItemStyled>
    );
}

const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background: ${(props) => props.theme.colorBgTask};
    box-shadow: ${(props) => props.theme.shadow7};
    border: 2px solid ${(props) => props.theme.borderColor2};

    height: 16rem;
    /* width: 25rem; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .task-header > h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .task-header .date {
        font-size: 1rem;
    }

    .task-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        margin-top: auto;
    }
    
    button {
        border: none;
        outline: none;
        cursor: pointer;
    }

    i {
        font-size: 1.4rem;
        color: 2px solid ${(props) => props.theme.colorGrey2};
    }

    .edit {
        margin-left: auto;
    }

    .completed, .incomplete {
        display: inline-block;
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.colorIncompleted};
        color: ${(props) => props.theme.colorIncompletedText};
        border-radius: 15px;
        transition: .3s ease-in-out;
        &:hover {
            background: ${(props) => props.theme.colorIncompletedDark};
        }
    }   
    .completed {
        background: ${(props) => props.theme.colorCompleted};
        color: #fff;
        &:hover {
            background: ${(props) => props.theme.colorCompletedDark};
        }
    }
`;

export default TaskItem