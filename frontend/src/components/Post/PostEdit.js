import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
    const { postId, postTitle, postText } = props;
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [isSent, setIsSent] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        editPost();
        setIsSent(true);
        setTitle("");
        setText("");
        handleClose();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const editPost = () => {
        fetch("/posts/" + postId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                title: title,
                text: text
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <p onClick={handleClickOpen}>
                Edit
            </p>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit your post below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="Title"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Text"
                        type="Text"
                        fullWidth
                        variant="standard"
                        value={text}
                        onChange={(i) => handleText(i.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
