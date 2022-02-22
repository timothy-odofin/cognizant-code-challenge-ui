import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { SignupComponent } from './core/pages/auth/signup/signup.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ListChallengeOutcomeComponent } from './core/pages/home/list-challenge-outcome/list-challenge-outcome.component';
import { SolveChallengeComponent } from './core/pages/home/solve-challenge/solve-challenge.component';
const routes: Routes = [
  {path:'home', component:HomeComponent, children:[
  {path: "challenge", component: SolveChallengeComponent},
  {path: "top-three-candidate", component: ListChallengeOutcomeComponent}
  ]
},
  {path:'', component:LoginComponent},
  {path:'signup', component:SignupComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
