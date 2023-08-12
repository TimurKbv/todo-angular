import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { ITodoList } from 'src/app/models/todoList';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todoList?: ITodoList;

  edit: boolean = false;
  addTodo: boolean = false;

  constructor(
    private todolistService: TodoListService
    ) { }
  
  addNewTodo(newTodo: ITodo) {
    console.log(newTodo);
    this.addTodo = false;

  }

  handleEdit() {
    console.log('is edit? ', this.edit);
    this.edit = !this.edit;
  }
    


  ngOnInit(): void {
    this.todolistService.getAllLists()
  }

}
