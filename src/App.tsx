import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
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
            <AddItemForm addItem={addTodolist} />
            {todolists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id];
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                );
            })}
        </div>
    );
}

export default App;

