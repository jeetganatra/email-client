const initialState = {
  isLogged: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      localStorage.clear();
      return { ...state, isLogged: action?.payload };
    case "LOGIN":
      return { ...state, isLogged: action?.payload };
    case "ERR":
      return { ...state, error: action?.payload };
    default:
      return state;
  }
};

export default authReducer;
