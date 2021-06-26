import * as api from '../api/index';

export const getMails = () => async (dispatch) => {
  try {
    const { data } = await api.getMails();
    dispatch({ type: 'GET_MAILS', payload: { ...data } });
    console.log(data);
  } catch (error) {
    if (error) {
      console.log(error?.response?.data.errors[0]?.msg);
      dispatch({ type: 'ERR', payload: error?.response?.data.errors[0]?.msg });
    }
  }
};