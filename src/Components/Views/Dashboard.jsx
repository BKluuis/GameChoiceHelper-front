import { useAuthentication } from "../Auth";
import { Box, Button, Container, Skeleton, Stack, Typography, colors } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Loading from "./Loading";
import UserCard from "../UserCard";
import Card from "../Card";
import { useTheme } from "@emotion/react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import GameDisplay, { GameDisplaySkeleton } from "../GameDisplay";
import { useEffect, useState } from "react";


function Home() {
    const theme = useTheme();
    const [games, setGames] = useState([]);

    /**
     * Game icons are simply horrible using the official api, might need to use steamgriddb or something like that
     */
    let user = useAuthentication({onSuccess: () => {
        fetch(process.env.REACT_APP_API_USER_LIBRARY, {credentials: "include"})
        .then(res => res.json())
        .then(data => setGames(data.games));
    }});



    if(!user){
        return <Loading message="Checking your credentials"/>
    }

    function handleRandom() {
        // fetch()
        console.log("random");
    }

    function handleFilter() {
        console.log("filter");
    }

    return (
        <Box height="100vh" sx={{backgroundImage: (theme) => theme.palette.gradient}} display="flex" flexDirection="column">
            <Stack direction="row" justifyContent="space-between">
                <UserCard sx={{mt: "20px", ml: "40px"}}/>
                <Stack mr="40px" width="30%" gap={2} alignItems="end" justifyContent="end">
                    <Card component={Button} variant="contained" shadowPad={10} width={theme.spacing(10)} height="25%" display="flex" justifyContent="center" alignItems="center"  onClick={handleFilter}>
                        <FilterAltIcon />
                    </Card>
                    <Card component={Button} variant="contained" width="50%" shadowPad={10} height={theme.spacing(10)} display="flex" justifyContent="center" alignItems="center" onClick={handleRandom}>
                        <Typography variant="h5" textAlign="center">
                            Random!
                        </Typography>
                    </Card>
                </Stack>
            </Stack>
            <Box flexGrow={1} bgcolor={theme.palette.primary.dark} px="1%" pt="1%" mt="10px" sx={{overflowY: "scroll"}}>
                <Grid2 container gap="5%"  disableEqualOverflow >
                 {/** do a map here */}
                    {games ? 
                        games.map((game, i) => <GameDisplay key={i} name={game.name} imgSrc={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}/>) 
                        : 
                        [<GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,
                         <GameDisplaySkeleton/>,] 
                    }

                    {/* <GameDisplay name="Blasphemous 2" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/>
                    <GameDisplay name="Jogo" imageSrc={user._json.avatarfull}/> */}
                </Grid2>
            </Box>
        </Box>
    )
}

export default Home;