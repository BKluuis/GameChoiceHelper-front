import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState } from "react";

export default function Card({sx, shadowPad, children}) {
    shadowPad = shadowPad ?? 20;

    return (
        <Paper elevation={10}
            sx={{  
                filter: (theme) => `drop-shadow(-${shadowPad}px ${shadowPad}px rgb(from ${theme.palette.primary.dark} r g b / 80%))`,
                borderRadius: "15px",
                backgroundColor: "primary.dark",
                mb: `${shadowPad}px`,
                ...(sx)
            }}>
            {children}
          </Paper>
    )
}