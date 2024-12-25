import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function ModalWrapper({ children }) {
  const theme = useTheme();
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

export default ModalWrapper;
