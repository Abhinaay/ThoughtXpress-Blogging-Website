import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {ForgotPayload} from './forgot-payload';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted: boolean;
  fPPayload: ForgotPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
    this.fPPayload = {
      username: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.fPPayload.username = this.forgotPasswordForm.get('username').value;

    this.authService.sendemail(this.fPPayload).subscribe(data => {
      console.log(data);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }
}
