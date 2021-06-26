import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    console.log(data);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    dispatch({ type: "ERR", payload: "" });
    localStorage.setItem("isLogged", true);
    dispatch({ type: "LOGIN", payload: true });
    history.push("/home");
  } catch (error) {
    if (error) {
      console.log(error?.response?.data.errors[0]?.msg);
      dispatch({ type: "ERR", payload: error?.response?.data.errors[0]?.msg });
    }
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    console.log(data);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    dispatch({ type: "ERR", payload: "" });
    localStorage.setItem("isLogged", true);
    dispatch({ type: "LOGIN", payload: true });
    history.push("/");
  } catch (error) {
    if (error) {
      console.log(error?.response?.data.errors[0]?.msg);
      dispatch({ type: "ERR", payload: error?.response?.data.errors[0]?.msg });
    }
  }
};

// export const userLoading = () => {
//   const profile = localStorage.getItem("profile");
//   if(profile){
//     const token = profile.token;

//   }
//   try {

//   } catch (error) {
//     if (error) {
//       dispatch({ type: "ERR", payload: error });
//     }
//   }
// }
