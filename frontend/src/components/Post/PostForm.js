import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({

    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function PostForm(props) {
    const { userId, userName, refreshFeed } = props;
    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [isSent, setIsSent] = React.useState(false);

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        savePost();
        refreshFeed();
        setIsSent(true);
        setTitle("");
        setText("");
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };

    return (
        <div className='postContainer'>
            <Snackbar open={isSent} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post has been sent!
                </Alert>
            </Snackbar>
            <Card sx={{
                width: 500,
                textAlign: "left",
                margin: 3,
                boxShadow: "none"
            }}>
                <CardHeader
                    avatar={
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ background: "#86a46b" }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}

                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder='Title'
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {<OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder='Text'
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant='contained'
                                        endIcon={<SendIcon />}
                                        style={{
                                            background: '#86a46b',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >Post</Button>
                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
