import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  registerForm = new FormGroup( {
    fullname: new FormControl<string>(''),
    city: new FormControl<string>(''),
    email: new FormControl<string>('', [
      Validators.email
    ]),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get fullname() {
    return this.registerForm.value.fullname;
  }
  get city() {
    return this.registerForm.value.city;
  }
  get email() {
    return this.registerForm.value.email;
  }
  get username() {
    return this.registerForm.value.username;
  }
  get password() {
    return this.registerForm.value.password;
  }

  submitHandler() {

    this.authService.register({
      fullname: this.registerForm.value.fullname as string,
      city: this.registerForm.value.city as string,
      email: this.registerForm.value.email as string,
      username: this.registerForm.value.username as string,
      password: this.registerForm.value.password as string
    }).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/'])
    }
    )
  }
}
