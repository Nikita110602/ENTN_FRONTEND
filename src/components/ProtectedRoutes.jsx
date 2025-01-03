import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  if (!token || !allowedRoles.includes(role)) {
    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              background: "linear-gradient(145deg, #f0f0f0, #e0e0e0)",
            }}
          >
            <LockIcon
              sx={{
                fontSize: 80,
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" color="error" gutterBottom>
              Unauthorized Access
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              You do not have permission to access this page.
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/");
              }}
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                borderRadius: 2,
              }}
            >
              Back to Login
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
