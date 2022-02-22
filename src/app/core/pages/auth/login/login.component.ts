import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/core/model/app-model';
import { AppService } from 'src/app/core/services/app.service';
import { AppConstant } from 'src/app/core/utils/app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitLoading:boolean=false;
  errorMessage:any
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
    })
  }
  closeMessage() {
    setTimeout(() => {
      this.errorMessage = null
    }, 5000);
  }
 get username() {
    return this.loginForm.get('username');
  }

   get password() {
    return this.loginForm.get('password');
  }
  login() {
    if(this.loginForm.invalid){
      return
    }
    this.submitLoading = true
    this.errorMessage = undefined;
    let payload: Login = new Login();
    payload.username = this.username?.value;
    payload.password = this.password?.value;
    this.appService.login(payload).subscribe((result: any) => {
      if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
       
        this.submitLoading = false
      } else {
        this.submitLoading = false
        this.errorMessage = result[AppConstant.DATA];
        this.closeMessage();
      }
    });
    this.loginForm.reset()
  }

}
