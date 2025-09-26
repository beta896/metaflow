import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleRouter({ role }) {
  switch (role) {
    case 'influencer':
      return <Navigate to='/influencer' />;
    case 'brand':
      return <Navigate to='/brand' />;
    case 'admin':
      return <Navigate to='/admin' />;
    default:
      return <Navigate to='/login' />;
  }
}
