import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../Components/Views/Dashboard";
import LandingPage from "../Components/Views/Landing";
import { GameDisplaySkeleton } from "../Components/GameDisplay";

const router = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route path="/" element={<LandingPage/>} />,
            <Route path="home" element={<Dashboard/>} />,
            <Route path="test" element={<GameDisplaySkeleton/>} />
        ]
    )
);

export default router;