import React, {useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e) => {
                           setNewTaskTitle(e.currentTarget.value)
                       }}
                       onKeyPress={(e) => {
                           if (e.charCode === 13) {
                               props.addTask(newTaskTitle)
                               setNewTaskTitle("");
                           }
                       }}
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle("");
                }
                }>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task =>
                        <li key={task.id}>
                            <input type={"checkbox"} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {props.removeTask(task.id)}}>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={(e) => {props.changeFilter("all")}}>All</button>
                <button onClick={(e) => {props.changeFilter("active")}}>Active</button>
                <button onClick={(e) => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}