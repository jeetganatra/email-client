const initialState = {
  mailList: [],
};

const mails = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MAILS":
      return { ...state, mailList: action?.payload };
    default:
      return state;
  }
};

export default mails;
