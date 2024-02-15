import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = (props) => {
  console.log(props.task);
  const doTask = () => {
    props.taskHandler(props.task);
  };
  return createPortal(
    <>
      <div className="modal-overlay" onClick={props.setTask}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-message">
            <p>Are you sure that you want to {props.task.task} ?</p>
            <button onClick={props.setTask}>X</button>
          </div>
          <div className="modal-buttons">
            <button className="modal-close" onClick={props.setTask}>
              Close
            </button>
            <button className="modal-delete" onClick={doTask}>
              {props.task.task}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
