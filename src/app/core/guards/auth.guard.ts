import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  LoginStatus: boolean;
  
  constructor(private appService: AppService, private router: Router) {
    this.ListentoLoginStatus();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
      if (this.LoginStatus) {
        return true;
      }

      else{
        this.router.navigateByUrl('/');
        return false;
      }
  }

  ListentoLoginStatus() {
    this.appService.loginStatus().subscribe(res => {
      this.LoginStatus = res; 
    });
  }
}
