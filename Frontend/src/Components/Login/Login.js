import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import { signin, signup } from '../../actions/auth';
import TitleBar from '../TitleBar/TitleBar';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import 'antd/dist/antd.css';

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const err = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fname: '',
    lname: '',
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isSignedUp) {
      // console.log('signIN');
      dispatch(signin(formData, history));
      err.error !== '' &&
        notification['success']({ message: 'Signed in successfully!' });
    } else {
      // console.log('signUp');
      dispatch(signup(formData, history));
      err.error !== '' &&
        notification['success']({ message: 'Signed in successfully!' });
    }
  };
  const { Link } = Typography;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
    });
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
    setShowConfirmPassword(false);
    dispatch({ type: 'ERR', payload: '' });
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
      // console.log(profile, token);
      localStorage.setItem('profile', JSON.stringify({ profile, token }));
      dispatch({ type: 'LOGIN', payload: true });
      localStorage.setItem('isLogged', true);
      history.push('/home');
      notification['success']({ message: 'Login Successful!' });
    } catch (error) {
      notification['error']({ message: error });
    }
  };

  const googleFailure = (error) => {
    notification['error']({ message: error });
  };

  return (
    <div>
      <TitleBar />
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignedUp ? 'Sign In' : 'Sign Up'}
          </Typography>
          <p style={{ color: 'red' }}>{err.error}</p>
          <form className={classes.form} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              {!isSignedUp && (
                <>
                  <Input
                    name='fname'
                    label='First Name'
                    handleChange={handleChange}
                    half
                    autofocus
                  />
                  <Input
                    name='lname'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name='email'
                value={formData.email}
                label='Email'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                value={formData.password}
                label='Password'
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                type={showPassword ? 'text' : 'password'}
              />
              {!isSignedUp && (
                <Input
                  name='confirmPassword'
                  label='Confirm Password'
                  handleShowPassword={handleShowConfirmPassword}
                  handleChange={handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                />
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignedUp ? 'Sign in' : 'Sign up'}
            </Button>

            <GoogleLogin
              clientId='795985652085-6ussjfntbaepe2fj9o244lntnbfk5su0.apps.googleusercontent.com'
              render={(renderProps) => (
                <div class='g-signin2' data-width='1000' data-height='200'>
                  <GoogleButton
                    onClick={renderProps.onClick}
                    style={{ width: '363px', marginBottom: '10px' }}
                    disabled={renderProps.disabled}
                  >
                    Sign in with Google
                  </GoogleButton>
                </div>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              style={{ marginTop: '100px' }}
              cookiePolicy='single_host_origin'
            />

            <Grid container justify='flex-end' style={{ alignItems: 'center' }}>
              {isSignedUp
                ? "Don't have an account?"
                : 'Already have an account?'}
              <Button
                onClick={toggle}
                style={{ boxShadow: '2px 2px 1px grey' }}
              >
                {isSignedUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
