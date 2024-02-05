"use client";

import React from 'react'
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { settings } from '@/app/utils/icons';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalContextProvider';

const Profile = () => {

    const { user } = useUser();
    const { firstName, lastName, imageUrl } = user || {
        firstName: "",
        lastName: "",
        imageUrl: "",
    }

    const { theme } = useGlobalState();

    return (
        <StyledProfile theme={theme}>
            <div className="profile-overlay"></div>
            <div className="image">
                <Image width={70} height={70} src={imageUrl} alt="profile"></Image>
            </div>
            <div className="profile-name">
                <h1>
                    <span>{firstName}</span>
                    <span>{lastName}</span>
                </h1>
            </div>
            <div className="user-btn absolute z-20 top-0 w-full h-full">
                <UserButton />
            </div>
            <div
                className="profile-actions"
            >
                <UserButton />
                {settings}
            </div>
        </StyledProfile>
    )
}

const StyledProfile = styled.div`
    margin: 1.5rem .3rem; 
    position: relative;
    padding: 1rem 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-btn {
        .cl-rootBox {
            width: 100%;
            height: 100%;

            .cl-userButtonBox {
                width: 100%;
                height: 100%;
                padding: 2rem;
                opacity: 0;

                .cl-buttonTrigger {
                width: 100%;
                height: 100%;
                padding: 2.5rem;
                }
            }
        }
    }

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    .profile-actions {
      z-index: 100;
      display: flex;

      .cl-rootBox {
      height: 100%;
      position: absolute;
      top: 0;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;
        opacity: 0;

        .cl-buttonTrigger {
          width: 100%;
          height: 100%;
        }
      }
    }
      i {
        font-size: 1.5rem;
      }
    }

    .profile-name > h1 {
      font-size: 1.2rem;
      flex-direction: column;
      line-height: 1.2;
    }
    
    .image, h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-right: 4rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }
    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }
      img {
        transform: scale(1.1);
      }
    }
`;

export default Profile