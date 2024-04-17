import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { boardSliceName } from "../../Redux/boardSlice";
import "./BoardCard.css";
import { sendRequest } from "../../tools/apiRequest";
import { requestMethods } from "../../tools/apiRequestMethods";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BoardCard = () => {
  const [boardData, setBoardData] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [columnId, setColumnId] = useState("");
  const [isEditting, setIsEditing] = useState(false);
  const selectedId = useSelector((global) => global[boardSliceName].selectedId);

  const getBoardCards = async () => {
    try {
      const response = await sendRequest(
        requestMethods.GET,
        `/board/getTodoBoard/${selectedId}`
      );

      if (response.status === 200) {
        console.log("Board fetched successfully", response.data);
        setBoardData(response.data.todos.columns);
      } else {
        console.error("Failed to fetch board");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      const body = JSON.stringify({
        boardId: selectedId,
        columnId: columnId,
        title: boardTitle,
        description: boardDescription,
      });

      const response = await sendRequest(
        requestMethods.POST,
        `/board/addTask`,
        body
      );

      if (response.status === 201) {
        console.log("Task created successfully", response.data);
        getBoardCards();
        setBoardTitle("");
        setBoardDescription("");
        setIsEditing(false);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleIsEditing = (id) => {
    setColumnId(id);
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBoardDescription(e.target.value);
  };

  useEffect(() => {
    getBoardCards();
  }, []);

  return (
    <div>
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
            <input
              placeholder="Enter board description"
              type="text"
              value={boardDescription}
              onChange={handleDescriptionChange}
            ></input>
            <div className="editting-buttons">
              <button onClick={createTask}>Confirm</button>
              <button onClick={() => toggleIsEditing(columnId)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <h1 className="main-title">Title</h1>
      <div className="board-container">
        {boardData.map((column, index) => (
          <div key={column.title} className="card-section">
            <div className="title-wrapper">
              <h2>{column.title}</h2>
              <button
                onClick={() => {
                  toggleIsEditing(column._id);
                }}
              >
                Add Task
              </button>
            </div>
            <div className="card-information">
              {column.cards.map((card, index) => (
                <div key={`${index}`} className="individual-cards">
                  <p className="individual-title">
                    <b>{card.title}</b>
                  </p>
                  <p className="individual-text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardCard;
