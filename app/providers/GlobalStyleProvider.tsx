"use client"
import React from 'react';
import styled from "styled-components";
import { useGlobalState } from '../context/globalContextProvider';
interface Props {
    children: React.ReactNode
}
const GlobalStyleProvider = ({ children }: Props) => {

    const { theme } = useGlobalState();

    return <GlobalStyles theme={theme}>{children}</GlobalStyles>
}

const GlobalStyles = styled.div`
    padding: .5rem;
    display: flex;
    /* gap: 2.5rem; */
    height: 100%;

    background: ${(props) => props.theme.foreground};
    background: ${(props) => props.theme.colorBg1};

    @media screen and (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }

    @media screen and (max-width: 450px) {
        .grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }

    @media screen and (max-width: 380px) {
        padding: .5rem;
        .grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }

`;
export default GlobalStyleProvider