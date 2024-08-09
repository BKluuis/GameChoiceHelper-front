import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Header from "../Components/Views/Header";
import LandingPage from "../Components/Views/Landing";
import GameDisplay, { GameDisplaySkeleton } from "../Components/GameDisplay";
import GameList from "../Components/Views/GameList";
import Loading from "../Components/Views/Loading";
import GameDetails, { ReviewButton } from "../Components/Views/GameDetails";
import { Box } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import UserCard from "../Components/UserCard";

const router = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route path="/" element={<LandingPage/>} errorElement={<Loading/>}/>,
            <Route element={<Header/>} children={
            [
                <Route key={1} index path="games" element={<GameList/>}/>,
                <Route key={2} path="random/:appid?" element={<GameDetails/>} loader={ async ({params}) => {
                    var gameinfo = false;

                    /** Visualize details of a chosen game */
                    if(params.appid){
                        const response = await fetch(process.env.REACT_APP_API + `/gameinfo?appid=${params.appid}`, {credentials: "include"});
                        if(response.status !== 404){
                            gameinfo = await response.json();
                            return gameinfo;
                        }
                    }

                    /** Visualize details of a random game */
                    do {
                        const game = await (await fetch(process.env.REACT_APP_API + "/random", {credentials: "include"})).json();
                        const response = await fetch(process.env.REACT_APP_API + `/gameinfo?appid=${game.appid}`, {credentials: "include"});
                        if(response.status !== 404){
                            gameinfo = await response.json();
                        }
                    } while (!gameinfo);
                    
                    return gameinfo;
                }}/>
            ]}
            />,
            <Route path="test" element={
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <UserCard/>
            {/* //         <GameDisplay 
            //         key={1} 
            //         name={"Kerbal Space Program"} 
            //         imgSrc={`https://cdn.cloudflare.steamstatic.com/steam/apps/220200/capsule_231x87.jpg`} 
            //         onClick={() => {}}/>                 */}
            </Box>
            } />
        ]
    )
);

export default router;