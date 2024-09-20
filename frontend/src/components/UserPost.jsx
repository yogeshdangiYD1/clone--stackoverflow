import { useState, useEffect } from "react";
import axios from "axios";
import MyCard from "./card";

function UserPost() {
  const [feeds, setFeeds] = useState([]);

  const fetchFeeds = async () => {
    try {
      const userId = localStorage.getItem("userId");
      // Get user ID (replace with logic)
      const response = await axios.get("http://localhost:5000/user/userpost", {
        params: {
          userId,
        },
      });
      console.log("User ID:", userId);
      setFeeds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);
  return (
    <div>
      {feeds.length > 0 ? (
        <ul>
          {feeds.map((feed) => (
            <li className="bg-white" key={feed._id}>
              <MyCard
                className=" min-w-full"
                title={feed.title}
                content={feed.content}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No feeds found.</p>
      )}
    </div>
  );
}

export default UserPost;
