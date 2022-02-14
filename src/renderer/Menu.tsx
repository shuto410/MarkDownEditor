import { Box, Button } from "@mui/material";
import React from "react";

interface MenuProps {
  onOpenButtonClick: () => void;
  onSaveButtonClick: () => void;
  onSaveAsButtonClick: () => void;
}

export const Menu: React.FC<MenuProps> = props => {
  return (
    <>
      <Box mb={2}>
        <Box component="span" ml={2} mr={2}>
          <Button variant="outlined" onClick={props.onOpenButtonClick}>OPEN</Button>
        </Box>
        <Box component="span" mr={2}>
          <Button variant="outlined" onClick={props.onSaveButtonClick}>SAVE</Button>
        </Box>
        <Box component="span" mr={2}>
          <Button variant="outlined" onClick={props.onSaveAsButtonClick}>SAVEAS</Button>
        </Box>
      </Box>
    </>
  )
}