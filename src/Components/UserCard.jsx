import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Card from "./Card";
import Loading from "./Views/Loading";
import { useAuthentication } from "./Auth";
import Link from '@mui/material/Link';
import { useEffect, useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import { orange } from "@mui/material/colors";

const userStatus = [
    {
        name: "Offline",
        icon: <CircleOutlinedIcon sx={{color: "grey"}}/>
    },
    {
        name: "Online",
        icon: <CircleIcon sx={{color: "green", justifySelf: "self-start"}}/>
    },
    {
        name: "Busy",
        icon: <RemoveCircleIcon sx={{color: "red"}}/>
    },
    {
        name: "Away",
        icon: <DarkModeIcon sx={{color: orange[400]}}/>
    },
    {
        name: "Snooze",
        icon: <DarkModeIcon sx={{color: orange[400]}}/>
    },
    {
        name: "Looking to trade",
        icon: <SwapVerticalCircleIcon sx={{color: "green"}}/>
    },
    {
        name: "Looking to play",
        icon: <SportsEsportsOutlinedIcon sx={{color: "green"}}/>
    },
];

/** TODO: user visibility state may be 1 aka private */
function UserCard({sx}){
    const [userStats, setUserStats] = useState({game: "", status: userStatus[0]})
    const user = useAuthentication({
        onSuccess: () => {
            fetch("http://localhost:3000/user/details", {credentials: "include"})
            .then(response => response.json())
                .then(data => setUserStats({game: data.gameextrainfo ?? null, status: userStatus[data.personastate]}))
        }, 
    });
    
    
    if(!user){
        return <Loading message="Checking your credentials"/>
    }

    return (
        <Card sx={{"height": "25vh", "width": "30vw", "minHeight": "150px", "minWidth": "400px", display: "inline-block", p: "20px", ...(sx)}} shadowPad={20}>
            <Stack flexDirection="row" height="100%" justifyContent="space-between">
                <img src={user._json.avatarfull} height="100%" style={{maxWidth: "100%", borderRadius: 15, marginRight: "5%"}}/>
                <Stack flexGrow={1} overflow="hidden"> 
                    <Typography variant="h6" sx={{overflow: "hidden", textOverflow: "ellipsis", pb:"5%"}}>{user._json.personaname}</Typography>
                    <Stack bgcolor="primary.light" flexGrow={1} borderRadius="15px" p="5%" justifyContent="space-evenly">
                        <Stack alignItems="center" direction="row" gap={1}>
                            <Link textAlign="center" underline="hover" color="text.primary" href={user._json.profileurl}>
                                Profile link
                            </Link>
                            <OpenInNewIcon/>
                        </Stack>
                        <Stack direction="row"  justifyContent="space-between">
                            <Stack direction="row" gap="3px">
                                {userStats.status.name}
                                {userStats.status.icon}
                            </Stack>
                            <Typography textAlign="right" variant="p" noWrap sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
                                {userStats.game ? "Playing " + userStats.game : "Not playing" }
                            </Typography>                                                                               
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
}

export default UserCard;