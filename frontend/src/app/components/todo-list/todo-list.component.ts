import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  // List Title Form
  form = new FormGroup({
    title: new FormControl<string>('')
  })

  get title() {
    return this.form.controls.title as FormControl
  }
  // Submit new List title
  submitNewTitle() {

    this.todolistService.updateTitle(this.todoList?._id as string, this.form.value.title as string)
    .subscribe(list => {
      this.todolistService.todoLists.forEach(todoList => {
        if (todoList._id === this.todoList?._id) {
          todoList.name = list.name
        }
      })
      this.edit = false;
    }
    )
  }

  closeEditForm() {
    this.edit = false;
  }

  openEditForm() {
    this.edit = true; 
    this.title.setValue(this.todoList?.name)
  }
  
  // New todo
  addNewTodo(newTodo: ITodo) {
    this.addTodo = false;
  }

  deleteTodoList() {
    console.log(this.todoList?.name);
    this.todolistService.deleteTodoList(this.todoList?._id as string)
    .subscribe(list => console.log(list)
    )
  }


  ngOnInit(): void {
    this.todolistService.getAllLists()
  }

}
