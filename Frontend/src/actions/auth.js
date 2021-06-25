import * as api from "../api/index";

export const signin = async (formData) => {
  try {
    const { data } = await api.signin(formData);
    console.log(data);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
  } catch (error) {
    if (error) {
      console.log(error?.response?.data.errors[0]?.msg);
      alert(error?.response?.data.errors[0]?.msg);
      localStorage.setItem(
        "error",
        JSON.stringify({ error: error?.response?.data.errors[0]?.msg })
      );
    }
  }
};

export const signup = async (formData) => {
  try {
    const { data } = await api.signup(formData);
    console.log(data);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
  } catch (error) {
    if (error) {
      console.log(error?.response?.data.errors[0]?.msg);
      alert(error?.response?.data.errors[0]?.msg);
      localStorage.setItem(
        "error",
        JSON.stringify({ error: error?.response?.data.errors[0]?.msg })
      );
    }
  }
};
