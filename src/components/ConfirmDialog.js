import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const withConfirmDialog = WrapperComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        title: "",
        text: "",
        callback: () => {}
      };
    }

    openConfirmDialog = (title, text, callback) => {
      this.setState({ title, text, callback, open: true });
    };

    onClose = option => {
      const { callback } = this.state;
      this.setState({ open: false });
      callback(option);
    };

    render() {
      const { open, title, text } = this.state;

      return (
        <>
          <WrapperComponent
            openConfirmDialog={this.openConfirmDialog}
            {...this.props}
          />
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.onClose(true)}
                autoFocus
                color="primary"
              >
                Sim
              </Button>
              <Button onClick={() => this.onClose(false)} color="secondary">
                Não
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  };
};

export default withConfirmDialog;
