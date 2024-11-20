import React from "react";
import { useRouteError } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      id="error-page"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          maxWidth: 600,
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: "#D32F2F", mb: 2 }} />
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Oops!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Sorry, an unexpected error has occurred.
        </Typography>
        {error?.statusText || error?.message ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <i>{error.statusText || error.message}</i>
          </Typography>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = "/"}
          sx={{ mt: 2 }}
        >
          Go Back to Home
        </Button>
      </Paper>
    </Box>
  );
}
