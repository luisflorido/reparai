import React, {useState} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

const TextInput = ({ name, error, errorMsg, text }) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  text = value;
  return (<FormControl className={classes.formControl} error={error}>
    <InputLabel htmlFor="component-error">{name}</InputLabel>
    <Input
      id="component-error"
      value={value}
      onChange={value => setValue(value.text)}
      aria-describedby="component-error-text"
    />
    <FormHelperText id="component-error-text">{errorMsg}</FormHelperText>
  </FormControl>);
};

TextInput.propTypes = {
  name: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  text: PropTypes.string
};

TextInput.defaultProps = {
  name: "",
  error: false,
  errorMsg: "",
  text: ""
};

export default TextInput;
