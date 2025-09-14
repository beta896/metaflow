export const getRole = (req, res) => {
  const token = req.headers['authorization'];
  let role = 'guest';

  if (token === 'admin-token') role = 'admin';
  else if (token === 'user-token') role = 'user';

  res.json({ role });
};
