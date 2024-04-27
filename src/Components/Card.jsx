/**
 * Beautiful guide to styled components: https://dev.to/rasaf_ibrahim/  styled-components-in-material-ui-mui-with-styled-utility-3l3j#child-component-and-child-element
 */

import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Card = styled(Box, {shouldForwardProp: (prop) => prop !== 'shadowPad' && prop !== 'shadowColor'})(
    ({theme, shadowPad, shadowColor, bgcolor, marginBottom}) => (
        {
        filter: `drop-shadow(-${shadowPad ?? 20}px ${shadowPad ?? 20}px rgb(from ${shadowColor ?? theme.palette.primary.dark} r g b / 80%))`,
        borderRadius: "15px",
        backgroundColor: bgcolor ?? theme.palette.primary.dark,
        marginBottom: marginBottom ?? `${shadowPad ?? 20}px`,
    })
); 

Card.defaultProps = { elevation: 10, borderRadius: "15px",  };

export default Card;