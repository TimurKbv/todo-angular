import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string | null = localStorage.getItem('token');

  constructor(
    private authService: AuthorizationService,
    private router: Router
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
    .subscribe(user => {
      this.authService.authenticate(user)
      this.router.navigate(['/'])
  })
    // this.authService.authenticate(this.authService.user)
    
  }

  ngOnInit(): void {
    if (this.token && !this.authService.isAuthenticated()) {
      this.authService.validateToken().subscribe(user => {
        this.authService.authenticate(user)
        this.router.navigate(['/'])
      }
      
      )
    }
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    }
  }
  

}
