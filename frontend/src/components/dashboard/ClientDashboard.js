import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CaseIcon from "@mui/icons-material/Gavel";
import LawyerIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const ClientDashboard = () => {
  const [stats, setStats] = useState({
    activeCases: 0,
    completedCases: 0,
    assignedLawyers: 0,
  });

  const [myCases, setMyCases] = useState([]);
  const [openNewCase, setOpenNewCase] = useState(false);
  const [newCaseData, setNewCaseData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    budget: "",
    status: "open",
  });

  const [clientId, setClientId] = useState("");

  useEffect(() => {
    // TODO: Fetch client's dashboard data
    // Mock data
    setStats({
      activeCases: 2,
      completedCases: 3,
      assignedLawyers: 2,
    });

    setMyCases([
      {
        id: 1,
        title: "Property Dispute Resolution",
        lawyer: "Jane Smith",
        status: "inProgress",
        type: "paid",
        updatedAt: "2023-04-15",
      },
      {
        id: 2,
        title: "Will Creation",
        lawyer: "Pending Assignment",
        status: "open",
        type: "proBono",
        updatedAt: "2023-04-14",
      },
    ]);
  }, []);

  /******* SETTING THE CURRENT CLIENT'S ID FOR CASE CREATION */
  /*********************************************************** */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        console.log("Decoded Token: ", decodedToken);
        if (decodedToken.user.id) {
          setClientId(decodedToken.user.id);
          console.log("Client ID set successful", clientId);
        } else {
          console.error("Token does not contain client ID");
        }
      } catch (err) {
        console.error("Error decoding token:", err.message);
      }
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  /********************************************** */
  /*********************************************** */

  const handleNewCase = () => {
    setOpenNewCase(true);
  };

  const handleCloseNewCase = () => {
    setOpenNewCase(false);
    setNewCaseData({
      title: "",
      description: "",
      category: "",
      type: "",
      budget: "",
    });
  };

  const handleInputChange = (e) => {
    setNewCaseData({
      ...newCaseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCase = async () => {
    // TODO: Submit new case to backend

    try {
      console.log("CLIENT ID = ", clientId);
      const response = await axios.post(
        `http://localhost:5000/api/cases/${
          clientId ? clientId : ""
        }/create-case`,
        newCaseData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Case created successfully", response);
    } catch (err) {
      console.error(err.message);
      return (
        <>
          <h1>Error while Creating Case</h1>
        </>
      );
    }

    handleCloseNewCase();
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "info",
      assigned: "primary",
      inProgress: "warning",
      completed: "success",
      closed: "error",
    };
    return colors[status] || "default";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Client Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewCase}
        >
          New Case
        </Button>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "primary.main", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CaseIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Active Cases</Typography>
              </Box>
              <Typography variant="h3">{stats.activeCases}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "success.main", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CaseIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Completed Cases</Typography>
              </Box>
              <Typography variant="h3">{stats.completedCases}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "secondary.main", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LawyerIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Assigned Lawyers</Typography>
              </Box>
              <Typography variant="h3">{stats.assignedLawyers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* My Cases */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Cases
            </Typography>
            <List>
              {myCases.map((case_, index) => (
                <React.Fragment key={case_.id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      py: 2,
                    }}
                  >
                    <ListItemText
                      primary={case_.title}
                      secondary={`Lawyer: ${case_.lawyer}`}
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Box sx={{ display: "flex", gap: 1, ml: { sm: 2 } }}>
                      <Chip
                        label={case_.type === "proBono" ? "Pro Bono" : "Paid"}
                        color={
                          case_.type === "proBono" ? "secondary" : "default"
                        }
                        size="small"
                      />
                      <Chip
                        label={
                          case_.status.charAt(0).toUpperCase() +
                          case_.status.slice(1)
                        }
                        color={getStatusColor(case_.status)}
                        size="small"
                      />
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* New Case Dialog */}
      <Dialog
        open={openNewCase}
        onClose={handleCloseNewCase}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Case</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="title"
              label="Case Title"
              fullWidth
              value={newCaseData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="description"
              label="Case Description"
              fullWidth
              multiline
              rows={4}
              value={newCaseData.description}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newCaseData.category}
                label="Category"
                onChange={handleInputChange}
              >
                <MenuItem value="Criminal">Criminal Law</MenuItem>
                <MenuItem value="Civil">Civil Law</MenuItem>
                <MenuItem value="Family">Family Law</MenuItem>
                <MenuItem value="Corporate">Corporate Law</MenuItem>
                <MenuItem value="IP">Intellectual Property</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={newCaseData.type}
                label="Type"
                onChange={handleInputChange}
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="proBono">Pro Bono</MenuItem>
              </Select>
            </FormControl>
            {newCaseData.type === "paid" && (
              <TextField
                name="budget"
                label="Budget (USD)"
                type="number"
                fullWidth
                value={newCaseData.budget}
                onChange={handleInputChange}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCase}>Cancel</Button>
          <Button
            onClick={handleSubmitCase}
            variant="contained"
            color="primary"
          >
            Create Case
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientDashboard;
