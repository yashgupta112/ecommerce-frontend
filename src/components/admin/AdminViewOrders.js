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

  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FaSearch} from "react-icons/fa";
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

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest('GET', '/admin/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");

  const itemsPerPage = 5;

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



  const filteredOrders = orders
    .filter((order) =>
        (order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.totalAmount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.username.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderDate.includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())) 
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.orderDate) - new Date(a.orderDate);
      if (sortBy === "total") return b.totalAmount - a.totalAmount;
      return 0;
    });

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search orders"
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
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="total">Total</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order history table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>TotalAmout </StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <StyledTableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.customer.username}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredOrders.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default OrderHistoryPage;