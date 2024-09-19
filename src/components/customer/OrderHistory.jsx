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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FaSearch, FaPrint, FaDownload, FaInfoCircle } from "react-icons/fa";
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest('GET', '/customer/orders'); 
        const data = response.data;
        setOrders(data);
        console.log('orders after: ', orders, typeof data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [filterStatus, setFilterStatus] = useState("All");

  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
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

  const filteredOrders = orders
    .filter((order) =>
      (order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderDate.includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || order.status === filterStatus)
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

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }
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
          <FormControl size="small">
            <InputLabel>Filter status</InputLabel>
            <Select value={filterStatus} onChange={handleFilterChange} label="Filter status">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Placed">Placed</MenuItem>
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
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <StyledTableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="view order details"
                    onClick={() => handleOrderClick(order)}
                  >
                    <FaInfoCircle />
                  </IconButton>
                </TableCell>
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
      <Dialog open={!!selectedOrder} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6">Order Number: {selectedOrder.id}</Typography>
              <Typography>Date: {selectedOrder.orderDate}</Typography>
              <Typography>Total: ${selectedOrder.totalAmount}</Typography>
              <Typography>Status: {selectedOrder.status}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Items:
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {selectedOrder.orderItems.map((order) => (
                    <TableRow>
                      <TableCell>{order.product.name}</TableCell>
                      <TableCell>{order.product.category}</TableCell>
                      <TableCell>${order.product.price}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.product.price * order.quantity}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button startIcon={<FaPrint />} onClick={() => window.print()}>
            Print
          </Button>
          <Button startIcon={<FaDownload />} onClick={() => alert("Download functionality to be implemented")}>Download</Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderHistoryPage;