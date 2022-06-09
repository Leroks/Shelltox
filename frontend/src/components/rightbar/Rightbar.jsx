import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useParams } from "react-router-dom";

export default function Rightbar({ profile }) {
  const {userId} = useParams();
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = (props) => {
    const {userId} = props;
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Experience: Game Developer</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Skills: C#</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Licenses and certificates: Unity Certified User</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: Ankara</span>
          </div>
          {localStorage.getItem("currentUser")===userId ? <button className="sidebarButton">Edit</button> : ""}

        </div>
        
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar userId={userId}/> : <HomeRightbar />}
      </div>
    </div>
  );
}
