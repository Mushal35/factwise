import { useDeferredValue, useState } from "react";
import Card from "./components/Card";
import { data } from "./data/data";
import "./app.css"
import Modal from "./components/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [celebData, setCelebData] = useState(data);
  const [task, setTask] = useState({ task: null });
  const defferedQuery = useDeferredValue(query, { timeoutMs: 500 });
  const filteredUsers = celebData.filter((user) => {
    const fullName = `${user.first} ${user.last}`.toLowerCase();
    return fullName.includes(defferedQuery.toLowerCase());
  });
  const taskHandler = (task) => {
    if (task.task == "delete") {
      setCelebData((prev) => prev.filter((el) => el.id != task.id));
    } else {
      setCelebData((prev) =>
        prev.map((el) => {
          if (el.id == task.id) {
            return { ...el, ...task.data };
          } else return el;
        })
      );
    }
    setTask({ task: null });
  };

  return (
    <>
      {task.task ? (
        <Modal
          task={task}
          taskHandler={taskHandler}
          setTask={() => setTask({ task: null })}
        />
      ) : null}
      <div className="outer-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="inner-container">
          {filteredUsers.map((el) => (
            <Card data={el} setTask={(task) => setTask(task)} key={el.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
