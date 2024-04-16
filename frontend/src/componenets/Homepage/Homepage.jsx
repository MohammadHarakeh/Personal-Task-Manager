import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  storeBoards,
  getBoardId,
  boardSliceName,
} from "../../Redux/boardSlice";
import { sendRequest } from "../../tools/apiRequest";
import { requestMethods } from "../../tools/apiRequestMethods";
import "./Homepage.css";

const Homepage = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [isEditting, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector((global) => global[boardSliceName].boards);

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
        getBoard();
      } else {
        console.error("Failed to create board:", response.status);
      }
    } catch (error) {
      console.log("Error creating board:", error);
    }
  };

  const getBoard = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, `/board/getBoard`);

      if (response.status === 200) {
        console.log("Board fetched successfully", response.data.boards);
        const boards = storeBoards(response.data.boards);
        dispatch(boards);
      } else {
        console.error("Failed to fetch boards");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleIsEditting = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  useEffect(() => {
    getBoard();
  }, []);

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

      <div className="board-card">
        {boards.map((board) => (
          <div
            key={board._id}
            className="board-item"
            onClick={() => {
              dispatch(getBoardId(board._id));
              navigate("/board");
            }}
          >
            <p>
              <b>Title:</b> {board.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
