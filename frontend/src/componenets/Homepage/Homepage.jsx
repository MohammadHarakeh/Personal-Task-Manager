import { React, useState } from "react";
import { sendRequest } from "../../tools/apiRequest";
import { requestMethods } from "../../tools/apiRequestMethods";
import "./Homepage.css";

const Homepage = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [isEditting, setIsEditing] = useState(false);

  const createBoard = async () => {
    try {
      const body = JSON.stringify({
        title: boardTitle,
      });

      const response = await sendRequest(
        requestMethods.POST,
        `/board/createBoard`,
        body
      );

      if (response.status === 201) {
        console.log("Board created successfully");
        setBoardTitle("");
        setIsEditing(false);
      } else {
        console.error("Failed to create board:", response.status);
      }
    } catch (error) {
      console.log("Error creating board:", error);
    }
  };

  const toggleIsEditting = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  return (
    <div className="homepage-wrapper">
      {isEditting && (
        <div className="blurred">
          <div className="editting-card">
            <div className="editting-title">Title</div>
            <input
              placeholder="Enter board title"
              type="text"
              value={boardTitle}
              onChange={handleTitleChange}
            ></input>
            <div className="editting-buttons">
              <button onClick={createBoard}>Confirm</button>
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

      <div className="board-card"></div>
    </div>
  );
};

export default Homepage;
