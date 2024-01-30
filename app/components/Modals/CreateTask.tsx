"use client"
import { useGlobalState } from '@/app/context/globalContextProvider';
import { plus } from '@/app/utils/icons';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/Button';

const CreateContent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const { theme, getAllTasks, closeModal } = useGlobalState();

    const handleChange = (name_value: string) => (e: any) => {
        switch (name_value) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            case "important":
                setImportant(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important,
        };

        try {
            const res = await axios.post("/api/tasks", task);

            if (res.data.error) {
                toast.error(res.data.error);
            }

            toast.success("Zadanie zostalo utworzone pomyslnie.");
            getAllTasks();
            closeModal();
        } catch (error) {
            toast.error("Cos poszlo nie tak.");
            console.log(error);
        }
    };


    return (
        <CreateTaskStyled onSubmit={handleSubmit} theme={theme}>
            <h1>Create new task</h1>

            <div className="input-control">
                <label htmlFor='title'>Task title</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    name='title'
                    onChange={handleChange('title')}
                    placeholder="np. Brand logo design"
                />
            </div>

            <div className="input-control">
                <label htmlFor='description'>Task description</label>
                <textarea
                    id='description'
                    value={description}
                    rows={4}
                    name='description'
                    onChange={handleChange('description')}
                    placeholder="Design a mobile or web interface for an Al-
                    powered image generator application."
                ></textarea>
            </div>

            <div className="input-control">
                <label htmlFor='date'>Date</label>
                <input
                    type='date'
                    id='date'
                    value={date}
                    name='date'
                    onChange={handleChange('date')}
                />
            </div>

            <div className="input-control toggler">
                <label htmlFor='completed'>Completed</label>
                <input
                    type='checkbox'
                    id='completed'
                    value={completed.toString()}
                    name='completed'
                    onChange={handleChange('completed')}
                />
            </div>

            <div className="input-control toggler">
                <label htmlFor='important'>Important</label>
                <input
                    type='checkbox'
                    id='important'
                    value={important.toString()}
                    name='important'
                    onChange={handleChange('important')}
                />
            </div>
            <div className="submit-btn flex justify-center">
                <Button
                    type='submit'
                    name='Utworz'
                    icon={plus}
                    padding={".6em 2rem"}
                    borderRad={"0.8rem"}
                    fontW={"500"}
                    fontS={"1.2rem"}
                    background={theme.colorButton}
                />
            </div>
        </CreateTaskStyled>
    )
}

const CreateTaskStyled = styled.form`
    
    color: ${(props) => props.theme.colorGrey1};
    
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }


    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;
        
        label {
            margin-bottom: .5rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);
            
            span {
                color: ${(props) => props.theme.colorGrey3};
            }
        }

        input, textarea {
            width: 100%;
            border: none;
            padding: 1rem;
            resize: none;
        
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};

            border-radius: .5rem;
        }
            
    }

    .submit-btn button {
        transition: all 0.55s ease-in-out;
        i {
            color: ${(props) => props.theme.colorGrey0};
        }

        &:hover {
            background: ${(props) => props.theme.borderColor1} !important;
        }
    }
    
    .toggler {
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
            flex: 1;
        }
        input {
            width: initial;
        }
    }
`;
export default CreateContent