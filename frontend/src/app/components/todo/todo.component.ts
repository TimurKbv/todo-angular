import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  edit: boolean = false;

  constructor(private todoService: TodoService) {}

  form = new FormGroup({
    text: new FormControl<string>('', {
      
    } )
    
  })

  get text() {
    return this.form.controls.text as FormControl;
  }

  handleCheckbox() {
    let newIsChecked = !this.todo.isChecked;

    let newData = {
      isChecked: newIsChecked,
      text: this.todo.text
    }
    
    this.todoService.updateTodo(this.todoList?._id, this.todo, newData)
    .subscribe(() => {
      this.todo.isChecked = newIsChecked;

    })
  }

  activateEditForm() {
    this.text.setValue(this.todo.text)
    this.edit = true;
  }

  handleText() {



    this.todoService.updateTodo(this.todoList?._id, this.todo, {
      text: this.form.value.text as string,
      isChecked: this.todo.isChecked
    }).subscribe(todo => {
      this.todo = todo;
    })
    this.edit = false;
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
