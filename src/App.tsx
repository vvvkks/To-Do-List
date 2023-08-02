import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
function App() {
    let [tasks, setTasks] = useState([
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ])
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }
    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks);
    }
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
