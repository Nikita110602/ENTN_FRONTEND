import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  EmailOutlined, 
  LockOutlined, 
  AdminPanelSettings 
} from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "nikitasharma110602@gmail.com",
    password: "12345678",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/user-dashboard");
    } catch (error) {
      alert("Error logging in: " + error.response.data.error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          width: '100%', 
          maxWidth: 450, 
          padding: 4, 
          borderRadius: 3, 
          background: 'rgba(255,255,255,0.9)' 
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#764ba2', 
              marginBottom: 2 
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
          >
            Login to your account
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          Login
        </Button>

        <Box 
          display="flex" 
          justifyContent="space-between" 
          mt={3}
        >
          <Button
            startIcon={<AdminPanelSettings />}
            color="secondary"
            onClick={() => navigate("/admin-login")}
            sx={{ textTransform: 'none' }}
          >
            Admin Login
          </Button>

          <Button
            color="primary"
            onClick={() => navigate("/register")}
            sx={{ textTransform: 'none' }}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
