import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  @Input() listId: string | undefined;
  @Output() newTodoEvent = new EventEmitter<ITodo>();

  constructor(
    private todoService: TodoService, 
    private todoListService: TodoListService
    ) { }

  form = new FormGroup({
    text: new FormControl<string>('', [
      Validators.required
    ])
  });

  get text() {
    return this.form.controls.text as FormControl;
  }

  submitNewTodo() {
    
    this.todoService.createNewTodo({
      text: this.form.value.text as string,
      isChecked: false

    }, this.listId).subscribe((todo) => {
      
      this.todoListService.todoLists.forEach(list => {
        if (list._id === this.listId) {
          list.todos.push(todo)
        }
      })

      this.newTodoEvent.emit({
        text: this.form.value.text as string,
        isChecked: false
      })
    }
    )
  }
 
}
