import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import React from "react";
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ open }) => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    }
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                transition: "width 0.3s ease",
                position: 'fixed',
                zIndex: 1200,
                height: "calc(100vh - 64px)",
                "& .MuiDrawer-paper": {
                    width: open ? 240 : 60,
                    transition: "width 0.3s ease",
                    overflowX: "hidden",
                },
            }}
        >
            <List sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '64px' }}>
                {[
                    { text: "Tableau de bord", icon: <DashboardIcon />, path: "/admin/dashboard" },
                    { text: "Création", icon: <AddIcon />, path: "/admin/create" },
                    { text: "Modification", icon: <EditIcon />, path: "/admin/modify"  },
                    { text: "Historique", icon: <HistoryIcon /> , path:"/admin/history"},
                    { text: "journal d'activité", icon: <WorkHistoryIcon/>, path:"/admin/my-history" },
                ].map((item, index) => (
                    <Tooltip title={!open ? item.text : ""} placement="right" key={index}>
                        <ListItem button onClick={() => handleNavigation(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItem>
                    </Tooltip>
                ))}
                <Box sx={{ marginTop: 'auto' }}>
                    <Tooltip title={!open ? "Paramètres" : ""} placement="right">
                        <ListItem button onClick={() => handleNavigation("/Parametres")}>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            {open && <ListItemText primary="Paramètres" />}
                        </ListItem>
                    </Tooltip>
                </Box>
            </List>
        </Drawer>
    );
};

export default Sidebar;