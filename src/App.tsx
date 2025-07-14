import { useEffect, useState } from "react";
import "./App.css";
type Priority = "Urgente" | "Moyenne" | "Basse";
type todo = {
  id: number;
  name: string;
  prority: Priority;
};

function App() {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Urgente");
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<todo[]>(initialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    const newTodo: todo = {
      id: Date.now(),
      name: task,
      prority: priority,
    };
    setTodos([...todos, newTodo]);
    setTask("");
    setPriority("Urgente");
    console.log(newTodo);
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col my-15 gap-4 bg-base-300 p-5 rounded-2xl">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            className="w-full input"
            placeholder="Ajouter une tache..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
