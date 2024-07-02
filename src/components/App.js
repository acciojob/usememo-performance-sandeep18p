

import React, { useMemo, useState } from "react";
import './../styles/App.css';


const Task = ({ data }) => {
  // Simulate complex rendering by artificially delaying the render
  const [rendered, setRendered] = useState(false);
  setTimeout(() => {
    setRendered(true);
  }, 100);

  return rendered ? <li>{data.title}</li> : null;
};

const App = () => {
  const generateTasks = () => {
    let tasks = [];
    for (let i = 0; i < 25; i++) {
      tasks.push({
        id: i,
        title: `Todo ${i + 1}`,
        completed: false,
      });
    }
    for (let i = 25; i < 50; i++) {
      tasks.push({
        id: i,
        title: `Todo ${i + 1}`,
        completed: true,
      });
    }
    return tasks;
  };

  // Correct initialization for tasks using useState
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Fixed the filterTask logic to properly filter tasks
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed); // Corrected filter for active tasks
      case "completed":
        return tasks.filter((task) => task.completed); // Corrected filter for completed tasks
      default:
        return tasks;
    }
  }, [filter, tasks]); // Corrected dependencies

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={toggleDarkMode}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div>
        <ul>
          {filteredTasks.map((task) => (
            <Task key={task.id} data={task} /> 
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
