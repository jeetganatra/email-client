const initialState = {
  mailList: [],
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAILS':
      return { ...state, mailList: action?.payload };
    case 'ERR':
      return { ...state, error: action?.payload };
    default:
      return state;
  }
};

export default authReducer;
