import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompileUiPayload, Login, Signup } from '../model/app-model';
import { AppConstant } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  base_api = environment.base_api;
  loginUser: any;

  private isLoggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, public toastService:ToastrService, private router:Router) { 
    this.checkLoginStatus()
  }
  loginStatus(): Observable<boolean> {
    return this.isLoggedin.asObservable();
  }

  checkLoginStatus() {
    let login:any =  JSON.parse(localStorage.getItem(AppConstant.LOGIN_USER)|| '{}')
    
    if (login !== null) {
      this.loginUser = login
      this.isLoggedin.next(true);
      // this.idleLogout()
    }
    else {
      this.isLoggedin.next(false);
    }
  }

  setLoginStatus(val:boolean): void {
    this.isLoggedin.next(val);
  }

  Logout(): void {
    localStorage.clear();
    this.isLoggedin.next(false);
    this.router.navigateByUrl('/');
  }
  fetchTasks(page:number,size:number) {
    return this.http
      .get(
        this.base_api +
          `api/task/list?page=${page}&size=${size}`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  fetchSupportedLanguages() {
    return this.http
      .get(
        this.base_api +
          `api/script/languages`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  listTopThreeSuccess() {
    return this.http
      .get(
        this.base_api +
          `api/task/report`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }

  sendCodeChallenge(payload:CompileUiPayload) {
    return this.http
      .post(this.base_api + `api/script/execute`, payload)
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  

  signup(payload:Signup) {
    return this.http
      .post(this.base_api + `entrance/create-account`, payload)
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  

  login(payload:Login) {
    return this.http
      .post(this.base_api + `entrance/signin`, payload)
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  errorHandler(error: HttpErrorResponse) {
    this.toastService.error(error.message,'Server Error')
    
  }
}
