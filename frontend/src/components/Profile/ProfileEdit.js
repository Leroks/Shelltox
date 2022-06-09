import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactPlayer from "react-player";


export default function FormDialog(props) {
    const { userId, userPhoto } = props;
    const [open, setOpen] = React.useState(false);
    const [userProfilePhoto, setUserPhoto] = React.useState("");
    const [isSent, setIsSent] = React.useState(false);



    const handleClickOpen = () => {
        console.log("aasssadss")

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        updatePhoto();
        setIsSent(true);
        setUserPhoto("");
        handleClose();
    }

    const handlePhoto = (value) => {
        setUserPhoto(value);
        setIsSent(false);
    }

    const updatePhoto = () => {
        fetch("/users/"+userId,
     {
          method : "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),
          },
          body : JSON.stringify({
            userPhoto : userPhoto 
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))
  }

    return (
        <div>
            <p onClick={handleClickOpen}>
                <Button onChange={(i) => handlePhoto(i.target.value)} ></Button>
            </p>

        </div>
    );
}
