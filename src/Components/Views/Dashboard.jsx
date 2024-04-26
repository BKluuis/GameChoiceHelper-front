import { useAuthentication } from "../Auth";
import { Box, Button, Stack } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Loading from "./Loading";
import UserCard from "../UserCard";
import Card from "../Card";
function Home() {
    let user = useAuthentication();

    if(!user){
        return <Loading message="Checking your credentials"/>
    }

    return (
        <Box height="100vh" sx={{backgroundImage: (theme) => theme.palette.gradient}}>
            <Stack direction="row" justifyContent="space-between">
                <UserCard sx={{mt: "20px", ml: "40px"}}/>
                <Stack mr="40px" gap={1}>
                    <Card shadowPad={10} sx={{width: "30px", height: "30px"}}>
                        <Button variant="contained">
                            <FilterAltIcon/>
                        </Button>
                    </Card>
                    <Card shadowPad={10} >
                        <Button  variant="contained" sx={{backgroundColor: "primary.dark"}}>Random!</Button>
                    </Card>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Home;