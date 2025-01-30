import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomPagination = ({ setPage, numOfPages}) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  // Create a custom theme
  const theme = createTheme({
    palette: {
      text: {
        primary: "#fff", // Text color for pagination
      },
    },
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            color: "#fff", // Root color for pagination (number & controls)
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </div>
    </ThemeProvider>
  );
};

export default CustomPagination;
