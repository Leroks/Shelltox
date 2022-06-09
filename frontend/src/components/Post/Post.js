import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import Comment from "../Comment/Comment"
import Container from '@mui/material/Container';
import CommentForm from "../Comment/CommentForm";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Menu, MenuItem, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import PostEdit from "./PostEdit";

TimeAgo.addDefaultLocale(en)

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

export default function Post(props) {
    const { title, text, userId, userName, postId, likes, createDate } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [commentList, setCommentList] = useState([]);
    const isFirstLoad = React.useRef(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [liked, setLiked] = useState(false)
    const [likeId, setLikeId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isSent, setIsSent] = React.useState(false);
    const open = Boolean(anchorEl);
    
    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    const handleMoreMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMoreMenuClose = () => {
        setAnchorEl(null);
    };

    const setCommentRefresh = () => {
        setRefresh(true)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            saveLike();
            setLikeCount(likeCount + 1)

        }
        else {
            deleteLike();
            setLikeCount(likeCount - 1)

        }
    }

    const refreshComments = () => {
        fetch("/comments?postId=" + postId,
            {
                headers: {
                    "Authorization": localStorage.getItem("tokenKey"),
                }
            },
        )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setCommentList(result)
                },
                (error) => {
                    console.log(error)
                    setIsloaded(true);
                    setError(error);
                }
            )
        setRefresh(false)
    }

    const checkLikes = () => {
        var likeCheck = likes.find((like => "" + like.userId === localStorage.getItem("currentUser")));
        if (likeCheck != null) {
            setLiked(true);
            setLikeId(likeCheck.id)
        }
    }
    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser"),
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
            .catch((err) => console.log(err))
    }

    const deletePost = () => {
        fetch("/posts/" + postId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey"),
            }
        })
        handleMoreMenuClose();
        setIsSent(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        }
        else
            refreshComments();
    }, [refresh])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className='postContainer'>
            <Snackbar open={isSent} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Your post has been deleted!
                </Alert>
            </Snackbar>
            <Card sx={{
                width: 500,
                textAlign: "left",
                margin: 1.5,
                borderStyle: "none",
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
                    action={
                        <div className="moreButton">
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMoreMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMoreMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem ><PostEdit postId={postId} postTitle={title} postText={text}></PostEdit></MenuItem>
                                <MenuItem onClick={deletePost} >Delete</MenuItem>
                                <MenuItem onClick={handleMoreMenuClose}>Report</MenuItem>
                            </Menu>
                        </div>
                    }
                    
                    title={title}
                    subheader={createDate }
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
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <ThumbUpIcon style={liked ? { color: "blue" } : null} />
                        </IconButton> :
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <ThumbUpIcon style={liked ? { color: "blue" } : null} />
                        </IconButton>}
                    {likeCount}
                    {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon style={expanded ? { color: "black" } : null} />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className="postContainer">
                        {error ? "error" :
                            isLoaded ? commentList.map(comment => (
                                <Comment userId={comment.userId} userName={comment.userName} text={comment.text}></Comment>
                            )) : "Loading"}
                        {localStorage.getItem("currentUser") == null ? "" :
                            <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
                    </Container>
                </Collapse>
            </Card>
        </div>
    );
}
