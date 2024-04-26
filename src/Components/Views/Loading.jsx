import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({message}) {
    return(
        <>
            <Box height="100vh" display="flex" flexDirection="column" gap="10%" alignItems="center" justifyContent="center" sx={{backgroundImage: (theme) => theme.palette.gradient}}>
                <Typography variant="h2">{message ?? "Loading..."}</Typography>
                <CircularProgress color="inherit"/>
            </Box>
        </>
    );
}