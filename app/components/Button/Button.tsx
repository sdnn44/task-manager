"use client";
import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'
import styled from 'styled-components';

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?: string;
    borderRad?: string;
    fontW?: string;
    fontS?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
    color?: string;
}

const Button = ({
    icon,
    name,
    background,
    padding,
    borderRad,
    fontW,
    fontS,
    click,
    type,
    border,
    color }: Props) => {

    const { theme } = useGlobalState();
    return (
        <ButtonStyled
            theme={theme}
            type={type}
            style={{
                background: background,
                padding: padding || "0.5rem 1rem",
                borderRadius: borderRad || "0.5rem",
                fontWeight: fontW || 500,
                fontSize: fontS,
                border: border
            }}
            onClick={click}
        >   {icon && icon}
            {name}
        </ButtonStyled>
    )
}
const ButtonStyled = styled.button`
    position: relative;
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.colorWhite};
    z-index: 5;
    cursor: pointer;

    i {
        margin-right: 1rem;
        color: ${(props) => props.theme.colorGrey2};
        font-size: 1.5rem;
        transition: all 0.55s ease-in-out;
    }

    &:hover {
        color: ${(props) => props.theme.colorGrey0};
        i {
            color: ${(props) => props.theme.colorGrey0};
        }
    }
`;
export default Button