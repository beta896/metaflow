const bcrypt = require("bcryptjs");

module.exports = async function (users, email, newPassword) {
  const user = users.find(u => u.email === email);
  if (!user) return { error: "User not found" };

  user.password = await bcrypt.hash(newPassword, 8);
  return { message: "Password reset successful" };
};
