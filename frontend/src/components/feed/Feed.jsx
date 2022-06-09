import Post from "../Post/ProfilePost";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

export default function Feed(props) {
  const{userId} = props;
  return (
    <div className="feed">
      <div className="feedWrapper">
        {localStorage.getItem("currentUser")===userId ? <Share />: ""}
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

