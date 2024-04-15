import { React, useState } from "react";
import "./Homepage.css";

const Homepage = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [isEditting, setIsEditting] = useState(false);

  //   const createBoard = async () => {
  //     const formData = new FormData();
  //     formData.append;

  //     try {
  //       const response = await fetch("http://localhost:3000/board/createBoard", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const toggleIsEditting = () => {
    setIsEditting((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div className="homepage-wrapper">
      {isEditting && (
        <div className="blurred">
          <div className="editting-card">
            <div className="editting-title">Title</div>
            <input placeholder="test"></input>
            <div className="editting-buttons">
              <button>Confirm</button>
              <button onClick={toggleIsEditting}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="homepage-title">Personal Task Manager</div>
      <div className="work-title">
        <p>Your Work</p>
        <button onClick={toggleIsEditting}>Create</button>
      </div>
    </div>
  );
};

export default Homepage;
