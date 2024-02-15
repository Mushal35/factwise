import React, { useRef, useState } from "react";
import { calculateAge, extractNames } from "../utils/utils";
import "./Card.css";

const Card = (props) => {
  const [editState, setEditState] = useState(false);
  const [drop, setDrop] = useState(false);
  const fullname = useRef();
  const age = useRef();
  const gender = useRef();
  const country = useRef();
  const description = useRef();

  const submitHandler = () => {
    setEditState((prev) => !prev);
    let data = {};
    const keys = ["age", "country", "description"];
    keys.forEach((key) => {
      data[key] = eval(key).current.textContent;
    });
    Object.assign(data, extractNames(fullname.current.textContent), {
      gender: gender.current.value,
    });
    props.setTask({ task: "save", id: props.data.id, data: data });
  };

  return (
    <div className={`outer-card ${editState ? "editing" : ""}`}>
      <div className="card-head">
        <img src={props.data.picture} alt="image"></img>
        <h2 contentEditable={editState} ref={fullname}>
          {props.data.first + " " + props.data.last}
        </h2>
        <button onClick={() => setDrop((prev) => !prev)}>opt</button>
      </div>
      {drop ? (
        <div className="card-body">
          <div className="card-body-1">
            <div className="container">
              <label>Age</label>
              <p contentEditable={editState} ref={age}>
                {props.age || calculateAge(props.data.dob)}
              </p>
            </div>
            <div div className="container">
              <label>Gender</label>
              {editState ? (
                <select ref={gender}>
                  <option value="rather not say">Rather not say</option>
                  <option value="male" selected={props.data.gender === "male"}>Male</option>
                  <option value="female" selected={props.data.gender === "female"}>Female</option>
                </select>
              ) : (
                <p>{props.data.gender}</p>
              )}
            </div>
            <div div className="container">
              <label>Country</label>
              <p contentEditable={editState} ref={country}>
                {props.data.country}
              </p>
            </div>
          </div>
          <div>
            <label>Description</label>
            <p contentEditable={editState} ref={description}>
              {props.data.description}
            </p>
          </div>
          <div className="card-footer">
            {editState ? (
              <>
                <button onClick={() => setEditState((prev) => !prev)}>
                  Cancel
                </button>
                <button onClick={submitHandler}>Save</button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    props.setTask({ task: "delete", id: props.data.id })
                  }
                >
                  Delete
                </button>
                <button onClick={() => setEditState((prev) => !prev)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
