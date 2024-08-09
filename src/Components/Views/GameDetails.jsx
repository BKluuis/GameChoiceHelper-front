import { Box, Button, Stack, Typography } from "@mui/material";
import { useLoaderData, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import Card from "../Card";
import { useState } from "react";

export function ReviewButton({forward = true, setIndex, index}){
   return <Card component={Button} variant="contained" shadowPad={10} bgcolor={(theme) => theme.palette.primary.main} shadowColor="black" minWidth="48px" width="48px" height="48px" display="flex" justifyContent="center" alignItems="center" onClick={() => setIndex(forward ? index + 1 : index - 1)}>
        {forward ? <ArrowForwardIcon /> : <ArrowBackIcon sx={{ml: "8px"}}/>}
    </Card>
}

export default function GameDetails(){
    const game = useLoaderData();
    const [reviewIndex, setReviewIndex] = useState(0);

    function infoMap(name, description, image){
        return (
            <Stack flexDirection="row" height="60%" mb="20px" justifyContent="space-between" >
                <Box mr="15px" minHeight="100%" minWidth="40%" maxWidth="50%"  borderRadius="15px" sx={{background: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover", aspectRatio: "460 / 215"}} />
                <Stack flexGrow={1} overflow="hidden"> 
                    <Typography variant="h6" sx={{overflow: "hidden", pb:"7px"}}>
                        {name}
                    </Typography>                                
                    <Typography variant="p" sx={{overflowY: "scroll"}}>
                        {description}
                    </Typography>   
                </Stack>
            </Stack>
        )
    }

    function reviewMap(reviews, index){
        if(!reviews.text){
            return;
        }

        const text = <Typography>{reviews.text[index % reviews.text.length]}</Typography>;
        const reviewer = reviews.link ? <Button variant="contained" href={reviews.link[index % reviews.link.length].href} sx={{display: "inline", color: (theme) => theme.palette.text.primary, px: "8px"}}>{reviews.link[index % reviews.link.length].name}</Button> : null;
        const ratings = reviews.rating ?  reviews.rating[index % reviews.rating.length] : null;

        return (
            <Stack gap="15px" marginRight="auto">
                {text}
                <Typography>
                    {ratings && ratings + " - "}
                    {reviewer}
                </Typography>
            </Stack>
        )
    }

    return (
        <Box flexGrow={1} bgcolor={(theme) => theme.palette.primary.dark} px="1%" mt="10px" display="flex" justifyContent="center" alignItems="center">
            <Card bgcolor={(theme) => theme.palette.primary.main} shadowColor="black" shadowPad={30} p="1%" width="60%">
                <Stack justifyContent="space-evenly" height="100%">
                    {infoMap(game.name, game.description, game.image)}
                    <Box height="40%"  gap="10px" display="flex" alignItems="center" justifyContent="space-between" borderRadius="15px" bgcolor={(theme) => theme.palette.primary.light} p="15px">
                        {game.reviews ? [
                            game.reviews.text.length > 1 && <ReviewButton forward={false} index={reviewIndex} setIndex={setReviewIndex}/>,
                            reviewMap(game.reviews, reviewIndex),
                            game.reviews.text.length > 1 && <ReviewButton forward={true} index={reviewIndex} setIndex={setReviewIndex}/>
                        ]
                        : "No official reviews included"}
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
}