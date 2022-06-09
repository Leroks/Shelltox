import "./Profile.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import image3 from "./default1.jpg";
import Feed from "../../components/feed/Feed";
import { Link, useParams } from "react-router-dom";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const [show, setShow] = useState(false);
  const { userId, userPhoto = image3 } = useParams();
  const mult =
    parseInt({ userId }.userId) * parseInt(localStorage.getItem("currentUser"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState();
  /*const[userPhoto, setUserPhoto] = useState("")*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const getUser = () => {
    fetch("/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUser();
  }, []);

  /*const updatePhoto = () => {
        fetch("/users/"+userId+"/image",
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
  }*/

  function buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("multiple", "multiple");
    return fileSelector;
  }

  class FileDialogue extends React.Component {
    componentDidMount() {
      this.fileSelector = buildFileSelector();
    }

    handleFileSelect = (e) => {
      e.preventDefault();
      this.fileSelector.click();
    };

    render() {
      return (
        <a className="editbutton" href="" onClick={this.handleFileSelect}>
          Edit Photo
        </a>
      );
    }
  }

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/avatars/a1.jpg"
                alt="the image is not showing"
              />
              <Link to={"/chat/"}>
                <img
                  className="profileUserImg"
                  src="/avatars/geyik.jpg"
                  alt=""
                />
              </Link>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">User {userId}</h4>
              <span className="profileInfoDesc">Student</span>
              <div className="editbutton">
                {" "}
                <FileDialogue />{" "}
              </div>
              <ProfileEdit
                userId={userId}
                userProfilePhoto={userPhoto}
              ></ProfileEdit>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={userId} />
            <Rightbar userId={userId} profile />
          </div>
        </div>
      </div>
    </>
  );
}
