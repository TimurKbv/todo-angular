import * as TodosModel from '../model/todos.model';
import {  Response, Request } from 'express';
import { get } from 'lodash';


/* -----------------TODO LIST------------------- */
// ALLE todolisten von user
export async function getAllTodoListsFromUser(req: Request, res: Response) {
    // let userId = req.tokenPayload.userId;
    const userId = get(req, 'tokenPayload.userId');
    console.log('Start to search all users todos >>> User ID :' , userId);
    
    try {
        let allLists = await TodosModel.findByUserId(userId);
        console.log(allLists);
        res.send(allLists)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
// ADD TODO LIST
export async function addTodoListToUser(req: Request, res: Response) {
    const userId = get(req, 'tokenPayload.userId');
    
    console.log('Add todo list to User >>> User ID :' , userId);
    let listName = req.body.name;
    try {
        let newList = await TodosModel.addTodoList(userId, listName);
        res.send(newList)
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}
// DELETE TODO LIST
export async function deleteTodoList(req: Request, res: Response) {
    const userId = get(req, 'tokenPayload.userId');
    let listId = req.params.listId;
    try {
        let deletedTodoList = await TodosModel.deleteTodoListById(listId, userId);
        console.log('deleted list: ', deletedTodoList);
        
        res.send(deletedTodoList);
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}

// UPDATE TODO LIST
export async function editTodoList(req: Request, res: Response) {
    const userId = get(req, 'tokenPayload.userId');
    let listId = req.params.listId;
    let body = req.body;
    try {
        let editedTodoList = await TodosModel.updateTodoList(listId, userId, body);
        console.log(editedTodoList);
        res.send(editedTodoList);
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}
// get todolist mit allem
export async function getTodoList(req: Request, res: Response) {
    const userId = get(req, 'tokenPayload.userId');
    let listId = req.params.listId;
    try {
        let todoList = await TodosModel.findTodoList(listId, userId);
        res.send(todoList);
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}


// /* -----------------------TODO--------------------------- */

// get todos nach listenId und userId
export async function getAllTodosOfUser(req: Request, res: Response) {

    const userId = get(req, 'tokenPayload.userId');
    let listId = req.params.listId;
    
    try {
        let todos = await TodosModel.getTodosOfUserById(userId, listId);
        console.log(todos);
        res.send(todos)
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}
// erstelle todo
export async function addTodoToList(req: Request, res: Response) {
    const userId = get(req, 'tokenPayload.userId');
    let text = req.body.text;
    let listId = req.params.listId;

    console.log('Todo add start >>> ', listId, req.body, userId);
    

    try {
        let todo = await TodosModel.addTodo(userId, text, listId);
        console.log(todo);
        
        res.send(todo);
    } catch (error) {
        res.status(error.code).send({
            error: error.message
        });
    }
}

// delete todo
export async function deleteTodoById(req: Request, res: Response) {
    let listId = req.params.listId;
    let todoId = req.params.todoId;
    const userId = get(req, 'tokenPayload.userId');

    try {
        let deletedTodo = await TodosModel.deleteTodo(listId, todoId, userId);
        console.log(deletedTodo);
        return res.send(deletedTodo)
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}

// bearbeite todo
export async function editTodoById(req: Request, res: Response) {
    let listId = req.params.listId;
    let todoId = req.params.todoId;
    const userId = get(req, 'tokenPayload.userId');
    let todoBody = req.body;
    try {
        let editedTodo = await TodosModel.editTodo(listId, todoId, userId, todoBody);
        console.log(editedTodo);
        res.send(editedTodo)
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}