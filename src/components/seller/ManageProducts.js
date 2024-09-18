// src/components/common/ManageProducts.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../api/api';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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

    return (
        <Container>
            <Typography variant="h4">Manage Products</Typography>
            <List>
                {products.map(product => (
                    <ListItem key={product.id} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => handleEdit(product.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={product.name} secondary={`$${product.price}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ManageProducts;
