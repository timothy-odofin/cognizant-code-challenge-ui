import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChallengeOutcomeComponent } from './core/pages/list-challenge-outcome/list-challenge-outcome.component';
import { SolveChallengeComponent } from './core/pages/solve-challenge/solve-challenge.component';
const routes: Routes = [
  { path: '', redirectTo: 'challenge', pathMatch: 'full' },
  {path: "challenge", component: SolveChallengeComponent},
  {path: "top-three-candidate", component: ListChallengeOutcomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
