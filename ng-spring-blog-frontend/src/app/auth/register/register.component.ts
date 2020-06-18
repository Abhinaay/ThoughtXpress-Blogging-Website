import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterPayload} from '../register-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {DynamicLoaderService} from 'angular-dynamic-loader';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  submitted = false;
  show: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router, private loader: DynamicLoaderService) {

    this.show = false;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    });

    this.registerPayload = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit() {
  }

// convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.loader.show();
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loader.hide();
      return;
    }
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      if (data === 0) {
        console.log('register success');
        this.loader.hide();
        $(document).ready(($function) => {
          setTimeout(() => {
            this.router.navigateByUrl('/hero');
          }, 5000);
        });
        document.getElementById('register-success').style.display = 'block';
      }
      else if (data === 1) {
        console.log('Username Not Available');
        document.getElementById('error4').style.display = 'block';
        this.loader.hide();
      }
      else {
        console.log('register failed');
        this.loader.hide();
      }
    });
  }

  password() {
    this.show = !this.show;
  }

  hideError4() {
    document.getElementById('error4').style.display = 'none';
  }

}
