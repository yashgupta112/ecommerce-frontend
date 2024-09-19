import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FaSearch } from "react-icons/fa";
import { makeRequest } from "../../api/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const AdminViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest('GET', '/admin/users');   
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  async function handleSuspend(userId) {
    try {
      await makeRequest('PUT', `/admin/users/suspend/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to suspend user');
    }
  }

  async function handleDelete(userId) {
    try {
      await makeRequest('DELETE', `/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  }



  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("status");
  const [filterStatus, setFilterStatus] = useState("All");

  const itemsPerPage = 10;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(1);
  };

  const filteredUsers = users
    .filter((user) =>
      (user.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || user.active.toString() === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === "username") return new Date(b.username) - new Date(a.username);
      if (sortBy === "email") return b.email - a.email;
      if (sortBy === "role") return b.role - a.role;
      if (sortBy === "status") return b.active - a.active;
      return 0;
    });

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <Typography variant="h5">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management 
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search users"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <FaSearch />,
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Sort by</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort by">
              <MenuItem value="username">Username</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="role">Role</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Filter by Status</InputLabel>
            <Select value={filterStatus} onChange={handleFilterChange} label="Filter by Status">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="true">Active &nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
              <MenuItem value="false">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="User history table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? 'Active' : 'Suspended'}</TableCell>
                <TableCell>
                  {/* Add buttons for suspending or deleting user */}
                  {user.active && <Button variant="contained" color="warning" sx={{mr: 2}} onClick={() => handleSuspend(user.id)}>Suspend</Button>}
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredUsers.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AdminViewUsers;