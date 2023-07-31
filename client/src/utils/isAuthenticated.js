const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
