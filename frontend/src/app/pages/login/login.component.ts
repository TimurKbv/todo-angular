import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthorizationService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  })

  submitLogin() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(user => this.authService.authenticate(user))
    // this.authService.authenticate(this.authService.user)
  }

  ngOnInit(): void {
    
  }
}
