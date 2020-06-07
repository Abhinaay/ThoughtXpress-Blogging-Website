import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  submitted: boolean;
  show: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.show = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login Success');
        this.router.navigateByUrl('/home');
      }else {
        console.log('login Failure');
      }
    });
  }

  password() {
    this.show = !this.show;
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
