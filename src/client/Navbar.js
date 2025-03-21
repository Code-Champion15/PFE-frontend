import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import { getAllPagesWithChildren } from "../services/api";

const Navbar = () => {
    const [pages, setPages] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const data = await getAllPagesWithChildren();
                console.log("Pages récupérées :", data);
                setPages(data);
            } catch (error) {
                console.error("Erreur lors de la recuperation des pages:", error);
            }
            
        };
        fetchPages();
    }, []);

    const handleOpenMenu = (event, pageId) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuId(pageId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenuId(null);
    };

    return (
        <AppBar position="static" sx={{ p:  1, background: '#1B374C'}}>
            <Toolbar>
                {pages.map((page) => (
                    <div key={page.id} style={{ position: "relative" }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to={`/${page.route}`}
                            onMouseEnter={(event) => handleOpenMenu(event, page.id)}
                            endIcon={page.Children && page.Children.length > 0 ? <ArrowDropDownIcon /> : null} 
                        >
                            {page.name}
                        </Button>

                        {page.Children && page.Children.length > 0 && (
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenuId === page.id}
                                onClose={handleCloseMenu}
                                onMouseLeave={handleCloseMenu}
                            >
                                {page.Children.map((child) => (
                                    <MenuItem key={child.id} component={Link} to={`/${child.route}`} onClick={handleCloseMenu}>
                                        {child.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    </div>
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
