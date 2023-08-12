import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { ITodoList } from 'src/app/models/todoList';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo: ITodo;
  @Input() todoList?: ITodoList;
  constructor(private todoService: TodoService) {}

  handleCheckbox() {
    console.log(this.todo);
    console.log(this.todoList);
    let newIsChecked = !this.todo.isChecked;

    let newData = {
      isChecked: newIsChecked,
      text: this.todo.text
    }
    
    this.todoService.updateTodo(this.todoList?._id, this.todo, newData)
    .subscribe(() => {
      this.todo.isChecked = newIsChecked;
      console.log(this.todo);
    })
  }

  handleText() {
    console.log(this.todo);
  }

  delete() {
    this.todoService.deleteTodo(this.todoList?._id, this.todo._id)
    .subscribe(() => {
      let todoIndex = this.todoList?.todos.findIndex(todo => this.todo._id === todo._id);
      this.todoList?.todos.splice(Number(todoIndex), 1)
    }
    )
  }
}
