export function tierMap(role) {
  switch (role) {
    case 'guest': return 0;
    case 'user': return 1;
    case 'affiliate': return 2;
    case 'admin': return 3;
    default: return -1;
  }
}

export function requireTier(minTier) {
  return function (req, res, next) {
    const role = req.user?.role || 'guest';
    const tier = tierMap(role);
    if (tier < minTier) {
      console.warn(\[Tier] Access denied for role '\'\);
      return res.status(403).json({ message: 'Insufficient tier level' });
    }
    next();
  };
}
