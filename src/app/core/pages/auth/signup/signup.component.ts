import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/core/model/app-model';
import { AppService } from 'src/app/core/services/app.service';
import { AppConstant } from 'src/app/core/utils/app-constants';
import { CustomValidators } from 'src/app/core/validators/customer-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup= new FormGroup({});
  submitLoading:boolean=false;
  errorMessage:any
  constructor(private appService:AppService, private route:Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl ('', [Validators.required]),
      userName: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
      comfirmPassword: new FormControl ('', [Validators.required]),
    }),
    CustomValidators.mustMatch('password', 'confirmPassword')
  }
  closeMessage() {
    setTimeout(() => {
      this.errorMessage = null
    }, 8000);
  }
  navigateToLogin() {
    setTimeout(() => {
      this.errorMessage = null
      this.route.navigateByUrl("/")
    }, 5000);
  }
  signup() {
    if(this.signupForm.invalid){
      return
    }
    this.submitLoading = true
    this.errorMessage = undefined;
    let payload: Signup = new Signup();
    payload.username = this.userName?.value;
    payload.password = this.password?.value;
    payload.name = this.name?.value;
    this.appService.signup(payload).subscribe((result: any) => {
      if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
        this.submitLoading = false
        this.appService.toastService.success(result[AppConstant.DATA],result[AppConstant.MESSAGE])
        this.navigateToLogin()
      } else {
        this.submitLoading = false
        this.errorMessage = result[AppConstant.DATA];
        this.closeMessage();
      }
    });
    this.signupForm.reset()
  }
  get f() {
    return this.signupForm.controls;
  }
   get name() {
    return this.signupForm.get('name');
  }

   get userName() {
    return this.signupForm.get('userName');
  }

   get password() {
    return this.signupForm.get('password');
  }

  get comfirmPassword() {
    return this.signupForm.get('comfirmPassword');
  }


}
