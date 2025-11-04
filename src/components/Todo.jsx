import { useState, useEffect } from "react";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (description) {
      setTask([...tasks, { id: crypto.randomUUID(), title, description }]);
      setTitle("");
      setDescription("");
    } else {
      alert("please write something");
    }
  }

  function handleDelete(currentId) {
    setTask(tasks.filter((task) => task.id !== currentId));

    if (tasks.length === 0) {
      localStorage.removeItem("todoTasks");
    } else {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }
  }

  return (
    <div>
      <div>TodoList</div>
      <form onSubmit={handleSubmit} className="space-x-2 mt-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your task title"
          className="border"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your task"
          className="border"
        />

        <button className="border">Submit</button>
      </form>

      <div className="flex justify-center items-center">
        {tasks.map((task) => (
          <div key={task.id} className="mt-5 relative   w-[300px] border">
            <div className="absolute top-0 right-0 p-2">
              <button
                className="text-2xl"
                onClick={() => handleDelete(task.id)}
              >
                X
              </button>
            </div>
            <h1 className="text-4xl mb-3">{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
