import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ITodo } from '../models/todo';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TodoService  {

  constructor( private http: HttpClient) {

  }

  createNewTodo(todo: ITodo, id: any): Observable<ITodo> {
    const token = localStorage.getItem('token');

    return this.http.post<ITodo>(`http://localhost:8080/todolists/${id}/todos/`, todo, {
      headers: {
        'Authorization': `Bearer ${token}`
    }  
    }).pipe(tap(todo => console.log(todo)
    ))
  }

  updateTodo(listId: any, todo: ITodo, newData: any): Observable<ITodo> {
    const token = localStorage.getItem('token');
    
    return this.http.put<ITodo>(`http://localhost:8080/todolists/${listId}/todos/${todo._id}`, newData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

}
