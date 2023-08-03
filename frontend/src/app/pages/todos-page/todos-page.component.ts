import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ITodoList } from 'src/app/models/todoList';
import { TodoService } from 'src/app/services/todo.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit{

  loading = false;
  todoLists: ITodoList[];

  constructor(
    public todoService: TodoService,
    public authService: AuthorizationService
    ) {

  } 


  ngOnInit(): void {
    this.loading = true;
    this.todoService.getAllLists().subscribe(lists => {
      console.log(lists)
      this.todoLists = lists
    }
    )
    this.authService.validateToken()

  }
}
