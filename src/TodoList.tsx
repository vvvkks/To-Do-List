import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }}/>
            <div>
                {
                    tasksForTodolist.map(task => {
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(task.id, newValue, props.id))
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            dispatch(changeTaskStatusAC(task.id, newIsDoneValue, props.id))
                        }
                        const onRemoveHandler = () => {
                            removeTaskAC(task.id, props.id);
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