import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { SubmissionOutcome } from '../../model/app-model';

@Component({
  selector: 'app-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styleUrls: ['./challenge-submission.component.scss']
})
export class ChallengeSubmissionComponent implements OnInit {
@Input()result:SubmissionOutcome
@Output() close= new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }
  closeDisplay(){
    this.close.emit(false)
  }

}
