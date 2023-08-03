import { ITodo } from "./todo";

export interface ITodoList {
    name: string;
    authors: string[];
    todos: ITodo[];
}