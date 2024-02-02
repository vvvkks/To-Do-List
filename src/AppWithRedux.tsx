import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import { AddItemForm } from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists);
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId,isDone, todolistId);
        dispatch(action);

    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action);
    }


    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string, ) {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action);
    }


    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position={"static"} color={"secondary"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id] || [];
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                        }
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;