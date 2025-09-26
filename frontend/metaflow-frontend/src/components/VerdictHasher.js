import crypto from 'crypto';

export const hashVerdict = (role) => {
  const timestamp = new Date().toISOString();
  const data = \\::\\;
  return crypto.createHash('sha256').update(data).digest('hex');
};
