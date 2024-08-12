import { Button, Stack, Typography } from "@mui/material";
import Card from "./Card";
import Loading from "./Views/Loading";
import { useAuthentication } from "./Auth";
import Link from '@mui/material/Link';
import { useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { orange } from "@mui/material/colors";

const userStatus = [
    {
        name: "Offline",
        icon: <CircleOutlinedIcon fontSize="1vw" sx={{color: "grey"}}/>
    },
    {
        name: "Online",
        icon: <CircleIcon fontSize="1vw" sx={{color: "green", justifySelf: "self-start"}}/>
    },
    {
        name: "Busy",
        icon: <RemoveCircleIcon fontSize="1vw" sx={{color: "red"}}/>
    },
    {
        name: "Away",
        icon: <DarkModeIcon fontSize="1vw" sx={{color: orange[400]}}/>
    },
    {
        name: "Snooze",
        icon: <DarkModeIcon fontSize="1vw" sx={{color: orange[400]}}/>
    },
    {
        name: "Looking to trade",
        icon: <SwapVerticalCircleIcon fontSize="1vw" sx={{color: "green"}}/>
    },
    {
        name: "Looking to play",
        icon: <SportsEsportsOutlinedIcon fontSize="1vw" sx={{color: "green"}}/>
    },
];

/** TODO: user visibility state may be 1 aka private */
/** TODO: Add logout button to the right of the name */
function UserCard({sx, onLogout}){
    const [userStats, setUserStats] = useState({game: "", status: userStatus[0]})
    const user = useAuthentication({
        onSuccess: () => {
            fetch(process.env.REACT_APP_API + process.env.REACT_APP_USER_DETAILS, {credentials: "include"})
            .then(response => response.json())
            .then(data => setUserStats({game: data.gameextrainfo ?? null, status: userStatus[data.personastate]}))
        }, 
    });    
    
    if(!user){
        return <Loading message="Checking your credentials"/>
    }

    return (
        <Card height="25vh" width="30vw" minHeight="150px" minWidth="400px" display="inline-block" p="20px" shadowPad={20} shadowColor="black" sx={sx}>
            <Stack flexDirection="row" height="100%" justifyContent="space-between">
                <img src={user._json.avatarfull} alt="User avatar" height="100%" style={{maxWidth: "100%", borderRadius: 15, marginRight: "5%"}}/>
                <Stack flexGrow={1} overflow="hidden"> 
                    <Stack direction="row" alignItems="center" justifyContent="space-between" pb="5%">
                        <Typography variant="h6" sx={{overflow: "hidden", textOverflow: "ellipsis", }}>{user._json.personaname}</Typography>
                        <Button href={process.env.REACT_APP_API + process.env.REACT_APP_LOGOUT} onClick={onLogout} sx={{color: "text.primary"}} >
                            <LogoutIcon />
                        </Button>
                    </Stack>
                    <Stack bgcolor="primary.light" flexGrow={1} borderRadius="15px" p="5%" justifyContent="space-evenly">
                            <Link textAlign="center" underline="hover" display="flex" alignItems="center" gap={1} color="text.primary" href={user._json.profileurl}>
                                Profile link
                                <OpenInNewIcon fontSize="1vw"/>
                            </Link>
                        <Stack direction="row"  justifyContent="space-between">
                            <Stack direction="row" gap="3px" alignItems="center">
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