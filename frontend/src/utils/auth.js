export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const login = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};