import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const [todolists, setTodolists] = useState<TodolistType[]>([]);
    const [tasksObj, setTasks] = useState<{ [key: string]: Array<{ id: string; title: string; isDone: boolean }> }>({});

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task));
        setTasks({ ...tasksObj, [todolistId]: updatedTasks });
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task));
        setTasks({ ...tasksObj, [todolistId]: updatedTasks });
    }


    function removeTask(taskId: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks({ ...tasksObj, [todolistId]: filteredTasks });
    }

    function addTask(title: string, todolistId: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        };
        const tasks = tasksObj[todolistId];
        const newTasks = [...tasks, newTask];
        setTasks({ ...tasksObj, [todolistId]: newTasks });
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const updatedTodolists = todolists.map((tl) =>
            tl.id === todolistId ? { ...tl, filter: value } : tl
        );
        setTodolists(updatedTodolists);
    }

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
        setTodolists(filteredTodolists);

        const updatedTasksObj = { ...tasksObj };
        delete updatedTasksObj[todolistId];
        setTasks(updatedTasksObj);
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title,
        };
        setTodolists([todolist, ...todolists]);
        setTasks({ ...tasksObj, [todolist.id]: [] });
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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                        }
                        return <Grid item>
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

export default App;

