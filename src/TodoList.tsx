import React, {ChangeEvent,KeyboardEvent, useState} from "react";
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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState("")
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("")
        }
    }
    const onChangeHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(title)
            setTitle("");
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }
                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }

                        return <li key={task.id}>
                            <input type={"checkbox"}
                                   onChange={onChangeHandler}
                                   checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={(e) => {onAllClickHandler()}}>All</button>
                <button onClick={(e) => {onActiveClickHandler()}}>Active</button>
                <button onClick={(e) => {onCompletedClickHandler()}}>Completed</button>
            </div>
        </div>
    )
}