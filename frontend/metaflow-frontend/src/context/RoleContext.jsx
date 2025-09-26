import PropTypes from 'prop-types';
import React, { createContext, useState, useContext, useEffect } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('guest');

  const assignRole = (newRole) => {
    if (typeof newRole === 'string' && newRole.trim() !== '') {
      setRole(newRole);
    } else {
      console.warn(`[RoleContext] Invalid role assignment attempted: ${newRole}`);
    }
  };

  useEffect(() => {
    console.log(`[RoleContext] Role changed to: ${role}`);
    // Optional: sync to localStorage or analytics
    // localStorage.setItem('userRole', role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, assignRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};