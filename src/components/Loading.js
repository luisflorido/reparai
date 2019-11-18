import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import loadingGif from "assets/loading.gif";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Loading = ({ loading }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.root}>
        <img src={loadingGif} />
      </div>
    );
  }
  return <></>;
};

Loading.propTypes = {
  loading: PropTypes.bool
};

Loading.defaultProps = {
  loading: false
};

export default Loading;
