import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITodoList } from 'src/app/models/todoList';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-edit-todo-list-name',
  templateUrl: './edit-todo-list-name.component.html',
  styleUrls: ['./edit-todo-list-name.component.css']
})
export class EditTodoListNameComponent {
  @Input() listId: string | undefined;
  @Output() newTitleEvent = new EventEmitter<string>()

  constructor(
    private todoListService: TodoListService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  submitNewTitle() {
    console.log(this.form.value.title);
    
    this.todoListService.updateTitle(this.listId as string, this.form.value.title as string)
    .subscribe(list => {
      this.todoListService.todoLists.forEach(todoList => {
        if (todoList._id === this.listId) {
          todoList.name = list.name
        }
      })
 
      this.newTitleEvent.emit()
    }
    )
  }

}
