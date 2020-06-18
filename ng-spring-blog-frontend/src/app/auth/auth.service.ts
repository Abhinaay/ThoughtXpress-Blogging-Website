import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegisterPayload} from './register-payload';
import {Observable, throwError} from 'rxjs';
import {LoginPayload} from './login-payload';
import {JwtAuthResponse} from './jwt-auth-response';
import {catchError, map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {ForgotPayload} from '../forgot-password/forgot-payload';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://spring-blog-backend.herokuapp.com/api/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      if (data.authenticationToken) {
        this.localStorageService.store('authenticationToken', data.authenticationToken);
        this.localStorageService.store('username', data.username);
        return true;
      } else {
        document.getElementById('login-failed').style.display = 'block';
      }

    }));
  }

  // tslint:disable-next-line:ban-types
  isAuthenticated(): Boolean{
    return this.localStorageService.retrieve('username') != null;
}

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }

  sendemail(fPPayload: ForgotPayload): Observable<string> {
    return this.httpClient.post<string>(this.url + 'sendemail', fPPayload);
  }
}
