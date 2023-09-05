import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ITodoList } from 'src/app/models/todoList';
import { TodoListService } from 'src/app/services/todo-list.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit {

  loading = false;

  constructor(
    public todoService: TodoListService,
    public authService: AuthorizationService,
    private  router: Router
    ) {

  } 


  ngOnInit(): void {
    this.loading = true;
    
      this.todoService.getAllLists().subscribe(lists => {
        console.log(lists)
        this.todoService.todoLists = lists;
        this.loading = false;
      }
      )
  }

  // ngDoCheck(): void {
  //   console.log('Docheck');
    
  // }
}
