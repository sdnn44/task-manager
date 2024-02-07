"use client";

import { useGlobalState } from '@/app/context/globalContextProvider';
import { logout, palette } from '@/app/utils/icons';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'
import Button from '../../Button/Button';

const AccountAction = () => {

    const { signOut } = useClerk();
    const { changeTheme } = useGlobalState();

    const router = useRouter();

    return (
        <div className="button-container">
            <div className="change-style relative m-6">
                <Button
                    name={"Change style"}
                    type={"submit"}
                    padding={"0.4rem 0.8rem"}
                    borderRad={"0.8rem"}
                    fontS={"1rem"}
                    fontW={"400"}
                    icon={palette}
                    click={changeTheme}
                />
            </div>
            <div className="sign-out relative m-6">
                <Button
                    name={"Logout"}
                    type={"submit"}
                    padding={"0.4rem 0.8rem"}
                    borderRad={"0.8rem"}
                    fontS={"1rem"}
                    fontW={"400"}
                    icon={logout}
                    click={() => {
                        signOut(() => router.push("/sign-in"));
                    }}
                />
            </div>
        </div>
    )
}

export default AccountAction