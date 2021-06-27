const initialState = {
  mailList: [],
  postReqSuc: false,
};

const mails = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MAILS":
      return { ...state, mailList: action?.payload };
    case "POST_SUC":
      return { ...state, postReqSuc: action.payload };
    default:
      return state;
  }
};

export default mails;
