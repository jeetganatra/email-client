import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import React, { useState } from "react";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import { signin, signup } from "../../actions/auth";

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
    lname: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isSignedUp) {
      console.log("signIN");
      signin(formData);
    } else {
      console.log("signUp");
      signup(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fname: "",
      lname: "",
    });
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const googleSuccess = (res) => {
    //console.log(res);
    const profile = res?.profileObj;
    const token = res?.tokenId;
    try {
      console.log(profile, token);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            {!isSignedUp && (
              <>
                <Input
                  name="fname"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autofocus
                />
                <Input
                  name="lname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              value={formData.email}
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              value={formData.password}
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
            />
            {!isSignedUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleShowPassword={handleShowConfirmPassword}
                handleChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? "Sign in" : "Sign up"}
          </Button>

          <GoogleLogin
            clientId="795985652085-6ussjfntbaepe2fj9o244lntnbfk5su0.apps.googleusercontent.com"
            render={(renderProps) => (
              <div class="g-signin2" data-width="1000" data-height="200">
                <GoogleButton
                  onClick={renderProps.onClick}
                  style={{ width: "363px", marginBottom: "10px" }}
                  disabled={renderProps.disabled}
                >
                  Sign in with Google
                </GoogleButton>
              </div>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            style={{ marginTop: "100px" }}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Button onClick={toggle}>
              {isSignedUp
                ? "Don't have an account??Sign Up"
                : "Already have an account!! Sign In"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
