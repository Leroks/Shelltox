import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, makeStyles } from '@mui/material'
import { CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import "./Comment.css"
import IconButton from '@mui/material/IconButton';
import SendSharpIcon from '@mui/icons-material/SendSharp';


const CommentForm = (props) => {
    const {userId, userName, postId, setCommentRefresh } = props;
    const [text, setText] = useState("");

    const saveComment= () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }

    const handleChange = (value) => {
        setText(value);
    }


    return (
        <CardContent className="comment">

            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 100 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className="link-comment" to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" className="small">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton aria-label="sendSharp">
                            <SendSharpIcon
                             style={{color:"purple"}}
                             onClick={handleSubmit}>

                            </SendSharpIcon>
                        </IconButton>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: 'white' }}
            ></OutlinedInput>
        </CardContent>

    )
}


export default CommentForm;