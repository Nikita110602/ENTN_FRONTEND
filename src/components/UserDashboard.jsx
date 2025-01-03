import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Button, 
  Typography, 
  Tooltip, 
  Box, 
  Card, 
  Paper, 
  Container, 
  Chip 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';

import CommunicationModal from "./CommunicationModal";
import CommunicationCalendar from "./CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const navigate = useNavigate();

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" color="textPrimary">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last 5 Communications",
      width: 350,
      renderCell: (params) => (
        <Tooltip key={params.row._id} title={params.row.notes}>
          <Typography variant="body2" color="textSecondary">{`${params.row.type.name} - ${new Date(
            params.row.date
          ).toLocaleDateString()}`}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "nextCommunication",
      headerName: "Next Scheduled Communication",
      width: 350,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        date.setDate(date.getDate() + 5);
        const updatedDateString = date.toLocaleDateString();
        return (
          <Typography variant="body2" color="textSecondary">{`${params.row.type.name} - ${updatedDateString}`}</Typography>
        );
      },
    },
  ];

  const handleCommunicationPerformed = () => {
    const x = rowSelectionModel;
    let mySet = new Set();
    let arr = [];

    for (let i = 0; i < x.length; i++) {
      mySet.add(x[i].slice(24, x[i].length));
    }

    mySet.forEach((el) => arr.push({ name: el }));

    setSelectedCompanyId(arr);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
    handleCloseModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/communications-user`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching communications:", error);
      return [];
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData);
      const ndata = await fetchNotificationsFromAPI();
      const over = ndata.filter((el) => el.type === "overdue");
      const today = ndata.filter((el) => el.type === "due today");
      setOver(over);
      setToday(today);
    };
    fetchData();
  }, []);

  // Rest of the previous component render method remains the same...
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* Header */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4} 
          p={2} 
          sx={{ 
            backgroundColor: "#f0f4f8", 
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <Box display="flex" alignItems="center">
            <DashboardIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              User Dashboard
            </Typography>
          </Box>
          <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Notification Section */}
        <Box mb={4}>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            gutterBottom 
            display="flex" 
            alignItems="center"
          >
            <NotificationsActiveIcon sx={{ mr: 2, color: "warning.main" }} />
            Notifications
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ 
                backgroundColor: "#ffebee", 
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <Box p={3}>
                  <Typography variant="h6" fontWeight="bold" color="error.main" gutterBottom>
                    Overdue Communications
                    <Chip 
                      label={over.length} 
                      color="error" 
                      size="small" 
                      sx={{ ml: 2 }} 
                    />
                  </Typography>
                  {over.length > 0 ? (
                    over.map((x, idx) => (
                      <Typography 
                        key={idx} 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 1 }}
                      >
                        {x.company.name} - {x.message}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No overdue communications
                    </Typography>
                  )}
                </Box>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ 
                backgroundColor: "#e3f2fd", 
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <Box p={3}>
                  <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                    Today's Communications
                    <Chip 
                      label={today.length} 
                      color="primary" 
                      size="small" 
                      sx={{ ml: 2 }} 
                    />
                  </Typography>
                  {today.length > 0 ? (
                    today.map((x, idx) => (
                      <Typography 
                        key={idx} 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 1 }}
                      >
                        {x.company.name} - {x.message}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No communications due today
                    </Typography>
                  )}
                </Box>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>

        {/* Data Grid */}
        <Box mb={4}>
          <Box 
            display="flex" 
            alignItems="center" 
            mb={2}
          >
            <EventIcon sx={{ mr: 2, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold">
              Communication History
            </Typography>
          </Box>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 2, 
              overflow: "hidden" 
            }}
          >
            <DataGrid
              rows={communications}
              getRowId={(row) => row._id + row.company.name}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                setSelected(newRowSelectionModel.length > 0);
              }}
              rowSelectionModel={rowSelectionModel}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: "#f0f4f8",
                  fontWeight: "bold"
                }
              }}
            />
          </Paper>
        </Box>

        {/* Communication Button */}
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommunicationPerformed}
            disabled={!selected}
            sx={{ 
              borderRadius: "8px", 
              textTransform: "none",
              px: 3,
              py: 1.5
            }}
          >
            Log Communication
          </Button>
        </Box>

        {/* Communication Modal and Calendar */}
        <CommunicationModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleLogCommunication}
          company={selectedCompanyId}
        />

        <CommunicationCalendar communications={communications} />
      </Box>
    </Container>
  );
};

export default UserDashboard;