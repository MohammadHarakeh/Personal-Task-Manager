import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { boardSliceName } from "../../Redux/boardSlice";
import "./BoardCard.css";
import { sendRequest } from "../../tools/apiRequest";
import { requestMethods } from "../../tools/apiRequestMethods";

const BoardCard = () => {
  const selectedId = useSelector((global) => global[boardSliceName].selectedId);

  const getBoardCards = async () => {
    try {
      const response = await sendRequest(
        requestMethods.GET,
        `/board/getTodoBoard/${selectedId}`
      );

      if (response.status === 200) {
        console.log("Board fetched successfully", response.data);
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

  return (
    <div>
      <h1 className="main-title">Title</h1>
      <div className="board-container">
        <div className="card-section">
          <h2>To Do</h2>
          <div className="card-information">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore veniam id libero distinctio vitae blanditiis, error
              corrupti molestias quae odit nam porro? Minus vel quisquam iste
              similique reiciendis temporibus?
            </p>
          </div>
        </div>

        <div className="card-section">
          <h2>To Do</h2>
          <div className="card-information">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore veniam id libero distinctio vitae blanditiis, error
              corrupti molestias quae odit nam porro? Minus vel quisquam iste
              similique reiciendis temporibus?
            </p>
          </div>
        </div>

        <div className="card-section">
          <h2>To Do</h2>
          <div className="card-information">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore veniam id libero distinctio vitae blanditiis, error
              corrupti molestias quae odit nam porro? Minus vel quisquam iste
              similique reiciendis temporibus?
            </p>
          </div>
        </div>

        <div className="card-section">
          <h2>To Do</h2>
          <div className="card-information">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore veniam id libero distinctio vitae blanditiis, error
              corrupti molestias quae odit nam porro? Minus vel quisquam iste
              similique reiciendis temporibus?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
