import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorMessage!: string;
  public constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    });
  }

  public handleLogin() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authenticationService.login(username, password).subscribe({
      next: (data) => {
        this.authenticationService.authenticate(data).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin');
          },
        });
      },
      error : (error) => this.errorMessage = error
    });
  }
}
