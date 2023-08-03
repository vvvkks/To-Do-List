import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange= {changeTodolistTitle} />
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(task => {
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                        }
                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }

                        return <div key={task.id} className={task.isDone ? "is-done" : ""}>
                            <Checkbox
                                color="success"
                                onChange={onChangeStatusHandler}
                                checked={task.isDone}/>
                            <EditableSpan title={task.title}
                                          onChange={onChangeTitleHandler}/>
                            <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
                                <Delete fontSize="inherit"/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"}
                        color={"inherit"}
                        onClick={(e) => {
                            onAllClickHandler()
                        }}>All
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"}
                        color={"secondary"}
                        onClick={(e) => {
                            onActiveClickHandler()
                        }}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"}
                        color={"success"}
                        onClick={(e) => {
                            onCompletedClickHandler()
                        }}>Completed
                </Button>
            </div>
        </div>
    )
}