import React, { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import "./ChatHome.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ChatForm from "../Chat/ChatForm";
import { style } from "@mui/system";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import List from '@mui/material/List';

import { Link } from "react-router-dom";

function ChatHome() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [chatList, setChatList] = useState([]);

    const refreshFeed = () => {
        fetch("/chat", {
        },
        )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setChatList(result)
                },
                (error) => {
                    console.log(error)
                    setIsloaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshFeed();
    }, [chatList])

    if (error) {
        return <h3> You are not authorized to view this page! Please login.  </h3>;
    } else if (!isLoaded) {
        return <div> Loading... </div>
    } else {
        return (
            <div class="wrapper">
                <article class="main">
                    <p>
                        <React.Fragment>
                            <CssBaseline />
                            <div>
                                <Box sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: '#f5f5f5',
                                }}>
                                    {localStorage.getItem("currentUser") == null ? "" : <ChatForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshFeed={refreshFeed}></ChatForm>}
                                </Box>
                                {chatList.slice(0).reverse().map(chat => (
                                    <Box sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: '#f6f6f6',
                                    }}>

                                        <Chat
                                            text={chat.text} userName={chat.userName} ></Chat>
                                    </Box>
                                ))}
                            </div>
                        </React.Fragment>

                    </p>
                </article>
                <aside class="aside aside-1">


                    <Card sx={{ maxWidth: 345 }} class="profilecard">

                        <CardMedia
                            component="img"
                            alt="card image"
                            height="140"
                            image="/avatars/default1.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                User {localStorage.getItem("currentUser")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                About
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link className="link" to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}><Button size="large">Learn More</Button></Link>
                        </CardActions>
                    </Card>
                </aside>
                <aside class="aside aside-2">

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                    </List>

                </aside>
            </div>
        );
    }

}

export default ChatHome;