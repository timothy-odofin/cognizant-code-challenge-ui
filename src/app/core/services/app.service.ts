import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompileUiPayload } from '../model/app-model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  base_api = environment.base_api;
  constructor(private http: HttpClient, public toastService:ToastrService) { }
  
  fetchTasks(page:number,size:number) {
    return this.http
      .get(
        this.base_api +
          `task/list?page=${page}&size=${size}`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  fetchSupportedLanguages() {
    return this.http
      .get(
        this.base_api +
          `script/languages`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  listTopThreeSuccess() {
    return this.http
      .get(
        this.base_api +
          `task/report`
      )
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }

  sendCodeChallenge(payload:CompileUiPayload) {
    return this.http
      .post(this.base_api + `script/execute`, payload)
      .pipe(catchError(async (err) => this.errorHandler(err)));
  }
  errorHandler(error: HttpErrorResponse) {
    this.toastService.error(error.message,'Server Error')
    
  }
}
