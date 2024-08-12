import AuthContext, { useAuthentication } from "../Auth";
import { Box, Button, Stack, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import Loading from "./Loading";
import UserCard from "../UserCard";
import Card from "../Card";
import LogoutSnackBar from "../LogoutSnackBar";
import { useTheme } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";


function Header() {
    const theme = useTheme();
    const {setUser} = useContext(AuthContext);
    const user = useAuthentication();
    const navigate = useNavigate();
    const [openSnack, setOpenSnack] = useState({open: false, message: "", isSuccess: false});
    
    if(!user){
        return <Loading message="Checking your credentials"/>
    }

    function handleRandom() {
        navigate("/random");
    }

    /** TODO: open a dialog that offers filters (just free to play games) that when selected, adds a query param to the url */
    function handleFilter() {
        console.log("filter");
    }

    
    function handleHome() {
        navigate("/");
    }

    function handleLogout(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_LOGOUT, {credentials: "include"})
        .then(res => res.json()
            .then(data => setOpenSnack({open: true, message: data.message, isSuccess: res.ok}))
        );
    }
    
    function handleFinishedLogout() {
        setUser(null);
        navigate("/");
    }

    return (
        <>
            <LogoutSnackBar state={openSnack} setState={setOpenSnack} onFinish={handleFinishedLogout}/>
            <Box height="100vh" sx={{backgroundImage: (theme) => theme.palette.gradient}} display="flex" flexDirection="column">
                <Stack direction="row" justifyContent="space-between">
                    <UserCard sx={{mt: "20px", ml: "40px"}} onLogout={handleLogout}/>
                    <Stack mr="40px" minWidth="15%" gap={2} alignItems="end" justifyContent="end">
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            <Card component={Button} variant="contained" shadowPad={10} shadowColor="black" width={theme.spacing(10)} height="100%" display="flex" justifyContent="center" alignItems="center" onClick={handleHome}>
                                <HomeIcon />
                            </Card>
                            <Card component={Button} variant="contained" shadowPad={10} shadowColor="black" width={theme.spacing(10)} height="100%" display="flex" justifyContent="center" alignItems="center" onClick={handleFilter}>
                                <FilterAltIcon />
                            </Card>
                        </Stack>
                        <Card component={Button} variant="contained" width="100%" shadowPad={10} shadowColor="black" height={theme.spacing(10)} display="flex" justifyContent="center" alignItems="center" onClick={handleRandom}>
                            <Typography variant="h5" textAlign="center">
                                Random!
                            </Typography>
                        </Card>
                    </Stack>
                </Stack>
                <Outlet />
            </Box>
        </>
    )
}

export default Header;