import {ChangeTodolistFilterActionType, ChangeTodolistTitleActionType, todolistsReducer} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from 'uuid'

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "My tasks", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    })

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "My tasks", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    })

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "My tasks", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const action: ChangeTodolistTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("My tasks");
    expect(endState[1].title).toBe("New Todolist");
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "My tasks", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})