import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable, catchError, delay, retry, tap, throwError } from 'rxjs';
import { ITodo } from '../models/todo';
import { ITodoList } from '../models/todoList';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  todos: ITodo[] = [];
  todoLists: ITodoList[] = [];
  token: string | null = localStorage.getItem('token');

  getAllLists(): Observable<ITodoList[]> {
    return this.http.get<ITodoList[]>('http://localhost:8080/todolists', {
      params: new HttpParams({
        // fromObject: {limit: 10}
      }),
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).pipe(
      retry(2),
      tap(todoLists => this.todoLists = todoLists),
      catchError(this.errorHandler.bind(this))
    )
  }
  
  createTodoList(todoList: ITodoList): Observable<ITodoList> {
    return this.http.post<ITodoList>('http://localhost:8080/todolists', todoList, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).pipe(tap(list => this.todoLists.push(list)))
  }

  deleteTodoList(listId: string) {
    return this.http.delete('http://localhost:8080/todolists' + listId, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }) //TODO delete list from array
  }
 
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }



}
