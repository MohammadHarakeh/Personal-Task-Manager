import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { boardSliceName } from "../../Redux/boardSlice";
import "./BoardCard.css";
import { sendRequest } from "../../tools/apiRequest";
import { requestMethods } from "../../tools/apiRequestMethods";

const BoardCard = () => {
  const [boardData, setBoardData] = useState([]);
  const selectedId = useSelector((global) => global[boardSliceName].selectedId);

  const getBoardCards = async () => {
    try {
      const response = await sendRequest(
        requestMethods.GET,
        `/board/getTodoBoard/${selectedId}`
      );

      if (response.status === 200) {
        console.log("Board fetched successfully", response.data);
        setBoardData(response.data.todos);
      } else {
        console.error("Failed to fetch board");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoardCards();
  }, []);

  console.log(boardData);

  return (
    <div>
      <h1 className="main-title">Title</h1>
      <div className="board-container">
        {boardData.map((section) => (
          <div key={section._id} className="card-section">
            <h2>{section.title}</h2>
            <div className="card-information">
              {section.cards.map((card) => (
                <p key={card._id}>{card.text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardCard;
