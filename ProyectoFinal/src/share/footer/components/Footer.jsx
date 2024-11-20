import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2E3B55",
        color: "#FFFFFF",
        padding: "16px",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        © 2024 Instituto Tecnológico de Tepic
      </Typography>
      <Typography variant="body2">
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "#FFCC00",
            fontWeight: "bold",
          }}
        >
          Equipo #5
        </Link>
      </Typography>
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        <Link href="https://facebook.com" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
          <Facebook />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
          <Twitter />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
          <Instagram />
        </Link>
      </Box>
    </Box>
  );
}
