import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user: IUser | null = null; 

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) { }

  isAuthenticated() {
    return this.user !== null;
  }

  validateToken(): Observable<IUser> {
    const token = localStorage.getItem('token');
    return this.http.get<IUser>('http://localhost:8080/users/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(user => this.user = user),
      catchError(this.errorHandler.bind(this))
    )
  }

  login(username: any, password: any): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8080/auth/login', {
      username: username,
      password: password
  }).pipe(
    tap(user => {
    this.user = user;
    console.log(this.user.user, 'logged successfully in');
  }))
  }

  authenticate(user: IUser) {
    this.user = user;
    localStorage.setItem('token', user.user.token);
    console.log('User authenticated!');
    
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

  // ERROR HANDLER
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }

}
