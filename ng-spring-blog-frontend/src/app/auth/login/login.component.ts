import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { DynamicLoaderService } from 'angular-dynamic-loader';

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
  constructor(private authService: AuthService, private router: Router, private loader: DynamicLoaderService) {
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
    this.loader.show();
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loader.hide();
      return;
    }
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login Success');
        this.loader.hide();
        this.router.navigateByUrl('/home');
      }else {
        console.log('login Failure');
        this.loader.hide();
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
