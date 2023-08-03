import { Component, Input } from '@angular/core';
import { ITodoList } from 'src/app/models/todoList';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todoList: ITodoList;



}
