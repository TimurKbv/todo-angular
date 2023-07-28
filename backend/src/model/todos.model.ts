import mongoose from "mongoose";


// ---------------------------------------------
// Definiere Todo Schema als sub-document
const todoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    isChecked: {type: Boolean, required: true},
});

// ------------------------------------------------------
// Definiere TodoList Schema
const todoListSchema = new mongoose.Schema({
    name: {type: String, required: true},
    authors: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    todos: [todoSchema]
});
// Erstelle ein neues Model Objekt fuer TodoList
const TodoList = mongoose.model('TodoList',todoListSchema);

export type Todos = {
    text: string,
    isChecked: boolean
}

export type TodoList = {
    _id: string,
    name: string,
    authors: mongoose.Types.ObjectId,
    todos: Array<Todos>
}

// get todos von user
export async function getTodosOfUserById(userId: string, listId: string) {
    // finde todolist
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    // wenn nicht dann Fehler
    if (!author) {
        throw {
            message: `False authorization`,
            code: 403
        }
    }
    // GEBE ZURÜCK TODOS
    return list.todos;
}

// ein todo zufügen
export async function addTodo(userId: string, text: string, listId: string) {
    // erstelle todo object
    let newTodo = {
        text: text,
        isChecked: false,
    };
    // finde todolist
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 403
        }
    }
    // speichere neues todo in todolist und gebe zurück
    list.todos.push(newTodo);
    return await list.save();
}

// lösche todo
export async function deleteTodo(listId: string, todoId: string, userId: string) {
    // finde list
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    console.log(author);
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde todo der gelöscht werden muss, um diesen zurück geben
    let searchedTodo = list.todos.find(todo => todo._id.toString() === todoId);
    // wenn todo nicht gefunden dann fehler
    if (!searchedTodo) {
        throw {
            message: `Todo with id: ${todoId} not found`,
            code: 404
        }
    }

    let indexOfTodo = list.todos.findIndex(todo => todo._id.toString() === todoId.toString());
    console.log('index of todo is: ', indexOfTodo);
    
    console.log(list);
    list.todos.splice(indexOfTodo, 1)
    // gebe zurück gelöschtes zurück
    return list.save();
}

// bearbeite todo 
export async function editTodo(listId: string, todoId: string, userId: string, todoBody: any) {
    // finde todolist
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde todoIndex
    let todoIndex = list.todos.findIndex(todo => todo._id.toString() === todoId);
    // wenn Index kleiner  0 (nicht exist) dann fehler
    if (todoIndex < 0) {
        throw {
            message: `Todo with id: ${todoId} not found`,
            code: 404
        }
    }
    console.log('todobody >>> ', todoBody);
    console.log('List >>> ', list);
    
    // nach index text von todo erneuern und speichern
    let currTodo = list.todos[todoIndex];
    todoBody._id = currTodo._id;

    list.todos.splice(todoIndex, 1, todoBody)

    await list.save();
    console.log('List >>> ', list);

    // gebe bearbeitete todo zurück
    return list;
}


// /* ------------------TODO LISTS------------------------ */
// // ein todolist erstellen
export async function addTodoList(userId: string, name: string) {
    // erstelle neue todolist
    let newTodoList = new TodoList({
        name: name,
        authors: [userId],
        todos: []
    });
    // speichere und gebe zurück neue todolist
    return await newTodoList.save();
}
// lösche totolist
export async function deleteTodoListById(listId: string, userId: string) {
    // finde todolist nach index
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde, lösche und gebe zurück 
    return await TodoList.findByIdAndDelete(listId);
}

// bearbeite todolist
export async function updateTodoList(listId: string, userId: string, body: TodoList) { 
    // finde todolist
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // schliesse aus der body todos aus
    delete body.todos;
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find((author: any) => author.toString() === userId);
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde , bearbeite und gebe zurück
    return await TodoList.findOneAndUpdate( {_id: listId}, body, {new: true} );
}

// finde todolist nach id
export async function findTodoList(listId: string, userId: string) {
    // finde todolist nach id
    let list = await TodoList.findById(listId);
    // wenn list nicht gefunden dann fehler   
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // gebe zurück gefundene todolist
    return list;
}


// alle listen die dem user gehören (ohne todos)
export async function findByUserId(userId: string) {
    let lists = await TodoList.find({authors: userId});
    console.log(lists);
    
    return lists;
}
