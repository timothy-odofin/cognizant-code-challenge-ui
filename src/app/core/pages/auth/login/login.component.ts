import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
    })
  }
 get email() {
    return this.loginForm.get('email');
  }

   get password() {
    return this.loginForm.get('password');
  }

}
