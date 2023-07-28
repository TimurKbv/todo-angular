
import express, { Router } from "express";
import { verifyToken } from "../middleware/verify.middleware";
import { addTodoListToUser, addTodoToList, deleteTodoById, deleteTodoList, editTodoById, editTodoList, getAllTodoListsFromUser, getAllTodosOfUser, getTodoList } from "../controllers/todos.controller";


// Erstelle neue Router Instanz
const todosRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
todosRouter.use(verifyToken);


    // /todolists/
todosRouter.route('/')
    .post(addTodoListToUser)  // Ein Todo List dem user zufügen
    .get(getAllTodoListsFromUser) // alle LIsten von user
    
todosRouter.route('/:listId')
    .put(editTodoList) // List bearbeiten
    .delete(deleteTodoList) // lösche list
    .get(getTodoList) // Ganze list bekommen 

    // /todolists/:listId/todos
todosRouter.route('/:listId/todos')   
    .get(getAllTodosOfUser) // get alle todos von user
    .post(addTodoToList) // ein todo erstellen
    

    // /todolists/:listId/todos/:todoId
todosRouter.route('/:listId/todos/:todoId')
    .delete(deleteTodoById) // lösche ein todo
    .put(editTodoById)  // bearbeite ein todo




export default todosRouter;