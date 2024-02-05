import React, {useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const TodoList = React.memo(function (props: PropsType) {

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(task => <Task
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                        removeTask={props.removeTask}
                        task={task}
                        todolistId={props.id}
                        key={task.id}
                    />)
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
})