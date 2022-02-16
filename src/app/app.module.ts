import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListChallengeOutcomeComponent } from './core/pages/list-challenge-outcome/list-challenge-outcome.component';
import { SolveChallengeComponent } from './core/pages/solve-challenge/solve-challenge.component';
import { ChallengeSubmissionComponent } from './core/pages/challenge-submission/challenge-submission.component';


@NgModule({
  declarations: [
    AppComponent,
    ListChallengeOutcomeComponent,
    SolveChallengeComponent,
    ChallengeSubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
