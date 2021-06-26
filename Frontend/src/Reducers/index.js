import authReducer from "./auth";
import mailsReducer from "./mails";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: authReducer,
  mails: mailsReducer,
});

export default allReducers;
