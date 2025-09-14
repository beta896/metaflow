module.exports = function (users, email, provider) {
  const user = users.find(u => u.email === email);
  if (!user) return { error: "User not found" };

  user.linked = user.linked || [];
  if (!user.linked.includes(provider)) user.linked.push(provider);

  return { message: `${provider} linked`, user };
};
