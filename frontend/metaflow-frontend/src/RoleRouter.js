import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OfferDisplay from './components/OfferDisplay';

const RoleRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/offers" element={<OfferDisplay />} />
    </Routes>
  );
};

export default RoleRouter;
