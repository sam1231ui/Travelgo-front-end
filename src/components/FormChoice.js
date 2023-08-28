import { Routes, Link, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Container } from '@mui/material';
// import HostRegister from './HostRegister';
import Register from './Register';
import SubscriptionComponent from './SubscriptionComponent';

const FormChoice = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission or navigation based on the selected role
    console.log('Selected Role:', selectedRole);
    // For demonstration purposes, let's just clear the selection
    setSelectedRole('redirect to');
  };

  return (
    <Container maxWidth="md" style={{ margin: '0 auto' }}>
      <h2>Register as </h2>
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select value={selectedRole} onChange={handleRoleChange}>
          <MenuItem value="travellers">
            <Link to="/reg" className="nav-lin px3">
              Traveller
            </Link>
          </MenuItem>
          <MenuItem value="property_owner">
            <Link to="/sub" className="nav-lin px3">
              Property_owner
            </Link>
          </MenuItem>
        </Select>
      </FormControl>
      {/* <Routes>
        <Route path="reg" element={<Register />} />
        <Route path="sub" element={<SubscriptionComponent />} />
      </Routes> */}
    </Container>
  );
};

export default FormChoice;
