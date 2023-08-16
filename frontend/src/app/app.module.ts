import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTodoListComponent } from './components/create-todo-list/create-todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorComponent } from './compinents/global-error/global-error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    TodoComponent,
    TodoListComponent,
    TodosPageComponent,
    HeaderComponent,
    CreateTodoListComponent,
    GlobalErrorComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    AddTodoComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
