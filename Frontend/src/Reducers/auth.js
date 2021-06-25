const authReducer = (state = "", action) => {
  switch (action.type) {
    case "LOGOUT":
      localStorage.clear();
      return state;
    case "ERR":
      return action?.payload;
    default:
      return state;
  }
};

export default authReducer;
