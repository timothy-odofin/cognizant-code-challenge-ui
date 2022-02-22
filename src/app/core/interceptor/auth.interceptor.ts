import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private appService: AppService, private router: Router) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.appService.getLoginUser()){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.appService.getLoginUser().tokenInfo.access_token}`
        }
      });
      return next.handle(request)
      .pipe(
        catchError(
          (err, caught) => {
            if (err.status === 401 || err.status === 403){
              this.handleAuthError();
              return of(err);
            }
            throw err;
          }
        )
      );
    }
    else{
      return next.handle(request);
    }
    
  }

  private handleAuthError() {
    localStorage.clear()
    this.router.navigateByUrl('/');
    this.appService.toastService.warning("Your session has expired, Login to continue", 'Session Timeout')
  }
}
