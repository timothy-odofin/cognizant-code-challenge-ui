import { Component, OnInit } from '@angular/core';
import { TaskReportResponse } from '../../../model/app-model';
import { AppService } from '../../../services/app.service';
import { AppConstant } from '../../../utils/app-constants';

@Component({
  selector: 'app-list-challenge-outcome',
  templateUrl: './list-challenge-outcome.component.html',
  styleUrls: ['./list-challenge-outcome.component.scss']
})
export class ListChallengeOutcomeComponent implements OnInit {
  dataList:TaskReportResponse[]
  errorMessage:any
  loading:boolean;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.listTopThreeSuccessfulSolution()
  }

  listTopThreeSuccessfulSolution(){
    this.loading = true
    this.appService.listTopThreeSuccess().subscribe(
      (result: any) => {
        if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
          this.dataList = result[AppConstant.DATA];
        } else {
          this.errorMessage = result[AppConstant.DATA];
          console.log(result[AppConstant.DATA])
        }
      },
      (error) => {
        this.appService.toastService.error(error, AppConstant.FAILED);
      }
    );
  }
}


