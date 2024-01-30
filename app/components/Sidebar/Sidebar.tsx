"use client"
import { arrow, bars, logout, palette, settings } from '@/app/utils/icons';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { Divider } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import styled from 'styled-components';
import { useGlobalState } from "../../context/globalContextProvider";
import menu from "../../utils/menu";
import Button from '../Button/Button';

const Sidebar = () => {

  const { theme, changeTheme, collapsed, collapseMenu } = useGlobalState();

  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useClerk();

  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  }

  const handleClick = (link: string) => {
    router.push(link);
  }
  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrow}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile"></Image>
        </div>
        <h1>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <div
          className="profile-actions"
        >
          <UserButton />
          {settings}
        </div>
      </div>
      <ul className='nav-items'>
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}>
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
      {/* <Divider sx={{ bgcolor: '#eee' }} variant="middle" textAlign="right">TeST</Divider> */}
      <div className="button-container">
        <div className="change-style relative m-6">
          <Button
            name={"Zmień styl"}
            type={"submit"}
            padding={"0.4rem 0.8rem"}
            borderRad={"0.8rem"}
            fontS={"500"}
            fontW={"1.2rem"}
            icon={palette}
            click={changeTheme}
          />
        </div>
        <div className="sign-out relative m-6">
          <Button
            name={"Wyloguj"}
            type={"submit"}
            padding={"0.4rem 0.8rem"}
            borderRad={"0.8rem"}
            fontS={"500"}
            fontW={"1.2rem"}
            icon={logout}
            click={() => {
              signOut(() => router.push("/sign-in"));
            }}
          />
        </div>
      </div>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  width: ${(props) => props.theme.sidebarWidth};
  position: relative;
  background: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2}; 
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 100;
    height: calc(100vh - 2rem);
    
    transition: all .3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) => props.collapsed ? "translateX(-100%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
      }
  }

  .toggle-nav {
    display: none;
    position: absolute;
    right: -2rem;
    top: 3.2rem;
    padding: .8rem;
    
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;

    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};

    background: ${(props) => props.theme.colorBg2};
  }


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

  .profile {
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
      width: 100%;
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
          background: red;
        }
      }
    }

      i {
        font-size: 1.5rem;
      }
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
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
  }

  .nav-item {
    position: relative;
    padding: 0.7rem 1rem 0.7rem 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;

    &::after {
      position: absolute;
      content: "";
      top: 0;
      width: 0%;
      left: 0;
      height: 100%;
      background: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all .3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      width: 0%;
      top: 0;
      height: 100%;
      background: ${(props) => props.theme.borderColor2};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all .3s ease-in-out;
      z-index: 2;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &:after {
        width: 100%;
      }
    }
  }

  .active {
    background: ${(props) => props.theme.activeNavLink};
    i,a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {

  }
`;
export default Sidebar