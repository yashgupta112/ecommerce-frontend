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
import { FaSearch, FaPrint, FaDownload, FaInfoCircle, FaEdit } from "react-icons/fa";
import { makeRequest } from "../../api/api";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            // const response = await axios.get('/api/products');
            const response = await makeRequest('GET', '/seller/products');
            setProducts(response.data);
        } catch (error) {
            // Check for 403 error
            if (error.response && error.response.status === 403) {
                // alert(error)
                navigate('/login');  // Redirect to login page
            } else {
                console.error('Error fetching products', error);
                // setErrorMessage('Failed to place order. Please try again.');
            } 
        } finally {
            setLoading(false);
          }
    };
    fetchProducts();
}, []);

const handleDelete = async (id) => {
    try {
        await  makeRequest('DELETE', `/seller/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
    } catch (error) {
        console.error('Error deleting product', error);
    }
};

const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
};


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("All");

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

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(1);
  };

  const filteredOrders = products
    .filter((product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) 
     )
    )
    .sort((a, b) => {
      if (sortBy === "name") return b.name - a.name;
      if (sortBy === "category") return b.category - a.category;
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
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
        Manage Products
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
              <MenuItem value="name">Product Name</MenuItem>
              <MenuItem value="category">Category</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Filter Category</InputLabel>
            <Select value={filterStatus} onChange={handleFilterChange} label="Filter category">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Electronics">Electronics&nbsp;</MenuItem>
              <MenuItem value="Clothing">Clothing&nbsp;&nbsp;</MenuItem>
              <MenuItem value="Books">Books&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order history table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Stock Available</StyledTableCell>
              {/* <StyledTableCell>Phone</StyledTableCell> */}
              {/* <StyledTableCell>Status</StyledTableCell> */}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((product) => (
              <StyledTableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                {/* <TableCell>{order.phone}</TableCell>
                <TableCell>{order.status}</TableCell> */}
                <TableCell>
                  <IconButton
                    aria-label="Edit Product"
                    onClick={() => handleEdit(product.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label="Delete Product"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
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

    </Box>
  );
};

export default ManageProducts;