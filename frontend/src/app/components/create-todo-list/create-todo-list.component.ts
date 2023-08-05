import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-create-todo-list',
  templateUrl: './create-todo-list.component.html',
  styleUrls: ['./create-todo-list.component.css']
})
export class CreateTodoListComponent implements OnInit {

  constructor(
    private todoService: TodoListService,
    private authService: AuthorizationService
  ) {}

  // user: string = '64c2c7350f3cd31ed12b32c3'

  form = new FormGroup({
    listName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ])
  })

  get listName() {
    return this.form.controls.listName as FormControl
  }

  submit() {
    console.log(this.form.value);
    this.todoService.createTodoList({
      name: this.form.value.listName as string,
      authors: [this.authService.user?.user._id],
      todos: [],
    }).subscribe()
  }

  ngOnInit(): void {
    this.todoService.getAllLists()
  }
}
