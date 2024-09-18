// src/components/admin/AdminViewUsers.js
import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../api/api';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

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
  console.log('users outside: ', users)

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>View Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.sort((a, b) => b.active - a.active).map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? 'ACTIVE' : 'SUSPENDED'}</TableCell>
                <TableCell>
                  {/* Add buttons for suspending or deleting user */}
                  {user.active && <Button variant="contained" color="warning" onClick={() => handleSuspend(user.id)}>Suspend</Button>}
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );

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
};

export default AdminViewUsers;
