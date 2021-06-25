import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React from "react";

const Input = (props) => {
  return (
    <Grid item xs={12} sm={props.half ? 6 : 12}>
      <TextField
        name={props.name}
        label={props.label}
        value={props.value}
        variant="outlined"
        fullWidth
        autoFocus={props.autofocus}
        type={props.type}
        required
        onChange={props.handleChange}
        InputProps={
          props.name === "password" || props.name === "confirmPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={props.handleShowPassword}>
                      {props.type === "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
