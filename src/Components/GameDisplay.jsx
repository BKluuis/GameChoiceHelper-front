import { Box, Skeleton, Stack, Typography, colors} from "@mui/material";
import Card from "./Card";
import { useRef } from "react";

/** TODO: onclick redirect to game viewing page just like random */
export default function GameDisplay({name, imgSrc}){
    let rotation = {x: 0, y: 0};
    const element = useRef(null);    

    /**
     * When the mouse enters the element, generates an animation to tilt the element towards the mouse slightly
     */
    function hoverAnimation(event) {       
        rotation.x = event.clientX;
        rotation.y = event.clientY;
       
        const bb = element.current.getBoundingClientRect();

        /** Equations for converting coordinates to NDC space: https://github.com/BKluuis/Graphics-Programming/blob/main/Software-Rasterizer/src/camera.cpp */
        rotation.x = ((2 * rotation.x) / bb.width - (bb.right + bb.left) / bb.width) * 8;
        rotation.y = ((2 * rotation.y) / bb.height - (bb.top + bb.bottom) / bb.height) * -20;

        /** The values are switched apparently */
        const keyframes = [{transform: `perspective(700px) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`}]

        element.current.animate(keyframes, {id: "card-hover", duration: 400, fill: "forwards" });
    }

    /**
     * When the mouse exits the element, grabs the last animation that executed, overrides it and apply again 
     * Note: not doing this way would cause "fill: forwards" to still execute and make the card tilt again
     */
    function hoverEndAnimation() {
        Promise.all(
            element.current.getAnimations({subtree: true}).map(anim => anim.finished),
        ).then(() => {
            let lastAnim = element.current.getAnimations()[0];
            if(lastAnim){
                let eff = lastAnim.effect;
                eff.setKeyframes([{transform: `perspective(700px) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`}, {transform: "none"}]);
                lastAnim.play();
            } else {
                element.current.animate([{transform: "none"}], {duration: 400, fill: "none"})
            }
        }).catch(e => console.log(e));
    }


    return(
        <Box width="15%" height="60%">
            <Card ref={element} bgcolor={(theme) => theme.palette.primary.main} shadowColor={colors.grey[900]}  shadowPad={15} py="10px" marginBottom="20px" sx={{transformStyle: "preserve-3d"}} onMouseMove={hoverAnimation} onMouseLeave={hoverEndAnimation} >
                <Stack flexDirection="column" height="100%" gap="10px" alignItems="center" >
                    <img src={imgSrc} alt="Game"  style={{minWidth: "60%", borderRadius: 15}} />
                    <Box borderRadius="15px" bgcolor={(theme) => theme.palette.primary.light} width="90%" minHeight="10vh" flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography textAlign="center" p="5px">{name}</Typography>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
}

export function GameDisplaySkeleton() {
    return (
        <Box width="15%" height="60%">
            <Card bgcolor={(theme) => theme.palette.primary.main} shadowColor={colors.grey[900]}  shadowPad={15} py="10px" marginBottom="20px" >
                <Stack flexDirection="column" height="100%" gap="10px" alignItems="center" >
                    <Skeleton variant="rounded" width="90%" height={90} />
                    {/* <img src={imgSrc} alt="Game"  style={{maxWidth: "90%", borderRadius: 15}} /> */}
                    <Box borderRadius="15px" width="90%" minHeight="10vh" flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Skeleton variant="rounded" width="100%" height={90} />
                        {/* <Typography textAlign="center" p="5px">{name}</Typography> */}
                    </Box>
                </Stack>
            </Card>
        </Box>
    )
}