import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import GameDisplay, { GameDisplaySkeleton } from "../GameDisplay";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GameList() {
    const navigate = useNavigate();
    const [games, setGames] = useState([
        <GameDisplaySkeleton key={0}/>,
        <GameDisplaySkeleton key={1}/>,
        <GameDisplaySkeleton key={2}/>,
        <GameDisplaySkeleton key={3}/>,
        <GameDisplaySkeleton key={4}/>,
        <GameDisplaySkeleton key={5}/>,
        <GameDisplaySkeleton key={6}/>,
        <GameDisplaySkeleton key={7}/>,
        <GameDisplaySkeleton key={8}/>,
        <GameDisplaySkeleton key={9}/>,
    ]);

      /**
     * Game icons are simply horrible using the official api, might need to use steamgriddb or something like that
     */
    useEffect(() => {
        /** Does this triggers an re-render that triggers itself? */
        fetch(process.env.REACT_APP_API + process.env.REACT_APP_USER_LIBRARY, {credentials: "include"})
        .then(res => res.json())
        .then(data => {
            const mappedGames = data.map((game, i) => 
                <GameDisplay key={i} name={game.name} imgSrc={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_231x87.jpg`} onClick={() => navigate(`/random/${game.appid}`)}/>
            );

            setGames(mappedGames);
        })
    }, []);

    return (
        <Box flexGrow={1} bgcolor={(theme) => theme.palette.primary.dark} px="1%" pt="1%" mt="10px" sx={{overflowY: "scroll"}}>
            <Grid2 container gap="5%" justifyContent="space-around" disableEqualOverflow >
                {games}
            </Grid2>
        </Box>
    );
};