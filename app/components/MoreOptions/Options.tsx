"use client";
import React, { useState } from 'react';
import { edit, trash } from '@/app/utils/icons';
import { useGlobalState } from '@/app/context/globalContextProvider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

interface OptionsProps {
    id: string;
}

const Options = ({ id }: OptionsProps) => {
    const { theme, openModal, deleteTask } = useGlobalState();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    color: "white",
                }}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="long-menu"
                sx={{
                    "& .MuiMenu-paper": {
                        backgroundColor: theme.bgOption,
                        color: "white",
                    },
                    "& .MuiMenu-root": {
                        color: "red",
                    }
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem
                    divider
                    onClick={() => {
                        handleClose();
                    }}>
                    <ListItemIcon
                        sx={{ color: "white" }}
                        onClick={openModal.editingTask}
                    >
                        {edit}
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        deleteTask(id);
                        handleClose();
                    }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        {trash}
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>

            </Menu>
        </div>
    )
}

export default Options