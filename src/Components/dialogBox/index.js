import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [open, props]);

  const handleCloseDisagree = () => {
    setOpen(false);
    props.closeDialogBox(false, false);
  };
  const handleCloseAgree = () => {
    setOpen(false);
    props.closeDialogBox(false, true);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleCloseAgree} color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.defaultProps = {
  dialogTitle: 'Are you sure ?',
  dialogContentText:'This means You want to remove it from saved Tournaments list.'
};

AlertDialogSlide.propTypes = {
  isOpen: PropTypes.bool,
  closeDialogBox: PropTypes.func
};
