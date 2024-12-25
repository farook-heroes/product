import React from "react";
import { Box } from "@mui/material";

function ModalWrapper(children) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box component="div" display="flex" flexDirection="column" p={0} m={0}>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor={theme.palette.background.paper}
          p={3}
          mt="20rem"
          mb={2}
          pt={2}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

ModalWrapper.propTypes = {
  children,
};

export default ModalWrapper;
