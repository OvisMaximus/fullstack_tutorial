const extractUser = () => {
  const userJson = window.localStorage.getItem("loggedUser");
  return userJson ? JSON.parse(userJson) : null;
};

export default { extractUser };
