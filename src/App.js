import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Login from './components/common/Login';
import Register from './components/common/Register';
import Profile from './components/common/Profile';
import NotAuthorized from './components/common/NotAuthorized';
import Logout from './components/common/Logout';
import Header from './components/common/Header';

// Customer Components
import ProductsList from './components/customer/ProductsList';
import Cart from './components/customer/Cart';
import PlaceOrder from './components/customer/PlaceOrder';
import OrderHistory from './components/customer/OrderHistory';

// Seller Components
import AddProduct from './components/seller/AddProduct';
import ManageProducts from './components/seller/ManageProducts';
import EditProduct from './components/seller/EditProduct';
import Home from './components/common/Home';
import RoleProtectedRoute from './components/common/RoleProtectedRoute';
import { ROLE } from './constants';
import AdminViewUsers from './components/admin/AdminViewUsers';
import AdminViewOrders from './components/admin/AdminViewOrders';
import AdminViewProducts from './components/admin/AdminViewProducts';
import { CartProvider } from './contexts/CartContext';

const App = () => {
  const addToCart = (product) => {
    console.log('Add to cart:', product); // This will handle adding to the cart
  };

  const placeOrder = () => {
    console.log('Placing order'); // This will handle placing an order
  };

  return (
    <UserProvider>
      <CartProvider>
        <Router>
        <Header /> 
          {/* <Container sx={{ mt: 4 }}> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
              {/* Customer Routes */}
              <Route path="/products" element={<RoleProtectedRoute allowedRoles={[ROLE.CUSTOMER]}><ProductsList addToCart={addToCart} /></RoleProtectedRoute> } />
              <Route path="/cart" element={<RoleProtectedRoute allowedRoles={[ROLE.CUSTOMER]}><Cart placeOrder={placeOrder} /></RoleProtectedRoute> } />
              <Route path="/place-order" element={<RoleProtectedRoute allowedRoles={[ROLE.CUSTOMER]}><PlaceOrder /></RoleProtectedRoute> } />
              <Route path="/order-history" element={<RoleProtectedRoute allowedRoles={[ROLE.CUSTOMER]}><OrderHistory /></RoleProtectedRoute> } />
              {/* Seller Routes */}
              <Route path="/add-product" element={<RoleProtectedRoute allowedRoles={[ROLE.SELLER]}><AddProduct /></RoleProtectedRoute> } />
              <Route path="/manage-products" element={<RoleProtectedRoute allowedRoles={[ROLE.SELLER]}><ManageProducts /></RoleProtectedRoute> } />
              <Route path="/edit-product/:id" element={<RoleProtectedRoute allowedRoles={[ROLE.SELLER]}><EditProduct /></RoleProtectedRoute> } />
            
              {/* Admin Routes */}
              <Route path="/admin/users" element={<RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}><AdminViewUsers /></RoleProtectedRoute> } />
              <Route path="/admin/orders" element={<RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}><AdminViewOrders /></RoleProtectedRoute> } />
              <Route path="/admin/products/" element={<RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}><AdminViewProducts /></RoleProtectedRoute> } />
            
            </Routes>
          {/* </Container> */}
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
