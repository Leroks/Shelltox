import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Search.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm";
import { style } from "@mui/system";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
//import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";


import List from "./List";

function Search() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };



    const refreshFeed = () => {
        fetch("/posts", {
        headers: {
          "Authorization": localStorage.getItem("tokenKey"),
      }},
        )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setPostList(result)
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
    }, [])

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
        <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
         <List input={inputText} />
      </div>
        
            <Box class="box">

                </Box>

                </div>
            </React.Fragment>

                    </p>
                </article>
                <aside class="aside aside-1">
                <div>
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Filter</h1>
              <div className="listResult"></div>
          <div className="lsItem"></div>
            <label>Users</label>
            <input type= "checkbox" />

            <div className="lsItem"></div>
            <label>Posts</label>
            <input type= "checkbox" />

            <div className="lsItem"></div>
            <label>Advertisements</label>
            <input type= "checkbox" />

            <div className="deneme"></div>
            <label>Events</label>
            <input type= "checkbox" />


        </div>
        

        </div>

      </div>

      </div>
                </aside>
               


            </div>
        );
    }

}

export default Search;
