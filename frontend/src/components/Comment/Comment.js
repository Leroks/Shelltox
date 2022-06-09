import React from 'react'
import {Link} from "react-router-dom";
import { Avatar, makeStyles } from '@mui/material'
import { CardContent, InputAdornment, OutlinedInput} from '@mui/material';
import "./Comment.css"

// const useStyles = makeStyles((theme) => ({
//     comment : {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent : "flex-start",
//         alignItems : "center",
//       },
//       small: {
//         width: theme.spacing(4),
//         height: theme.spacing(4),
//       },
//       link: {
//           textDecoration : "none",
//           boxShadow : "none",
//           color : "white"
//       }

// }));

const Comment = (props) => {
    const { text, userId, userName } = props;


    return (
        <CardContent className = "comment">

        <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 25}}
        fullWidth     
        value = {text} 
        startAdornment = {
            <InputAdornment position="start">
                <Link  className="link-comment" to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" className="small">
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>
            </InputAdornment>
        }
        style = {{ color : "black",backgroundColor: 'white'}}
        ></OutlinedInput>
        </CardContent>

    )
}


export default Comment;