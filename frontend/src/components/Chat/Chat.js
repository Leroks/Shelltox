import React, { useState } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { color } from "@mui/system";


// import "./Chat.css"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({

    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Chat(props) {
    const { text, userId, userName } = props;
    const [expanded, setExpanded] = React.useState(false);
    const isFirstLoad = React.useRef(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [refresh, setRefresh] = useState(false);
    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    return (
        <div className='chatContainer'>
            <Card sx={{
                width: 500,
                textAlign: "left",
                margin: 1.5,
                borderStyle: "none",
                boxShadow: 10,
                backgroundColor: '#47d147',
                borderRadius: '20px'
            }}>
                <CardHeader
                    avatar={
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ background: "purple" }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}

                            </Avatar>
                        </Link>
                    }
                />
                
                {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
                
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                   
                </Collapse>
            </Card>
        </div>
    );
}
