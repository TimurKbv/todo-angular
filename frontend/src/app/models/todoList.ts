import { ITodo } from "./todo";

export interface ITodoList {
    _id?: string;
    name: string;
    authors: string[];
    todos: ITodo[];
}