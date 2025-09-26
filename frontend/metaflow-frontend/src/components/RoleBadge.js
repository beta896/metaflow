import React from 'react';

const roleStyles = {
  Admin: { color: '#B22222', backgroundColor: '#FFE4E1', border: '2px solid #B22222' },
  User: { color: '#1E90FF', backgroundColor: '#E6F0FF', border: '2px solid #1E90FF' },
  Guest: { color: '#696969', backgroundColor: '#F5F5F5', border: '2px dashed #696969' },
  Influencer: { color: '#800080', backgroundColor: '#F0E6FF', border: '2px solid #800080' },
  Brand: { color: '#228B22', backgroundColor: '#E6FFE6', border: '2px solid #228B22' }
};

const RoleBadge = ({ role }) => {
  const style = {
    padding: '6px 12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    display: 'inline-block',
    ...roleStyles[role]
  };

  return <span style={style}>{role}</span>;
};

export default RoleBadge;
