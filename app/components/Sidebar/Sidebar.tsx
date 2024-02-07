"use client"
import { arrow, bars } from '@/app/utils/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import styled from 'styled-components';
import { useGlobalState } from "../../context/globalContextProvider";
import menu from "../../utils/menu";
import AccountAction from './AccountAction/AccountAction';
import Profile from './Profile/Profile';

const Sidebar = () => {

  const { theme, collapsed, collapseMenu } = useGlobalState();

  const router = useRouter();
  const pathname = usePathname();


  const handleClick = (link: string) => {
    router.push(link);
  }

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrow}
      </button>
      <Profile />
      <ul className='nav-items'>
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""} my-${item.marginVal}`}
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
      <AccountAction />
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
    width: 15rem;
    position: fixed;
    z-index: 100;
    height: calc(100vh - 2rem);
    background: ${(props) => props.theme.foreground};
    transition: all .3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) => props.collapsed ? "translateX(-105%)" : "translateX(-10%)"};

    .toggle-nav {
      display: block !important;
      }
  }

  @media screen and (max-width: 380px) {
    height: calc(100vh);
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

    background: ${(props) => props.theme.foreground};
  }

  .nav-item {
    position: relative;
    padding: 0.7rem 1rem 0.7rem 2.1rem;
    /* margin: 0.3rem 0; */

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
      font-size: 1rem;
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