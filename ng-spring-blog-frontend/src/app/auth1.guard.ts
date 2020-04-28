import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuth = this.authService.isAuthenticated();
    if (isAuth){
      this.router.navigateByUrl('/home');
    } else {
      return true;
    }
  }

}
