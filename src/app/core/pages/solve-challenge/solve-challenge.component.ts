import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksResponse, Language, SubmissionOutcome, CompileUiPayload } from '../../model/app-model';
import { AppService } from '../../services/app.service';
import { AppConstant } from '../../utils/app-constants';

@Component({
  selector: 'app-solve-challenge',
  templateUrl: './solve-challenge.component.html',
  styleUrls: ['./solve-challenge.component.scss']
})
export class SolveChallengeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tasks: TasksResponse[] = [];
  languages: Language[] = [];
  errorMessage: any;
  taskDescription: string = '';
  submissionResult: SubmissionOutcome;
  submitLoading:boolean=false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      task: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
    });
    this.initializeData()
  }
  initializeData() {
    this.appService.fetchTasks(AppConstant.PAGE, AppConstant.SIZE).subscribe(
      (result: any) => {
        if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
          this.tasks = result[AppConstant.DATA];
        } else {
          this.errorMessage = result[AppConstant.DATA];
        }
      },
      (error) => {
        this.appService.toastService.error(error, AppConstant.FAILED);
      }
    );
    this.appService.fetchSupportedLanguages().subscribe(
      (result: any) => {
        if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
          this.languages = result[AppConstant.DATA];
        } else {
          this.errorMessage = result[AppConstant.DATA];
        }
      },
      (error) => {
        this.appService.toastService.error(error, AppConstant.FAILED);
      }
    );
  }
  onOptionsSelected(event: any) {
    this.taskDescription = this.tasks.find(
      (x) => x.id == event.value
    )?.description!;
  }

  get name() {
    return this.form.get('name');
  }

  get task() {
    return this.form.get('task');
  }

  get source() {
    return this.form.get('source');
  }

  get language() {
    return this.form.get('language');
  }
  closeMessage() {
    setTimeout(() => (this.errorMessage = null), 5000);
  }
  submitChallenge() {
    if(this.form.invalid){
      return
    }
    this.submitLoading = true
    this.errorMessage = undefined;
    let payload: CompileUiPayload = new CompileUiPayload();
    payload.language = this.language?.value;
    payload.script = this.source?.value;
    payload.taskId = this.task?.value;
    payload.username = this.name?.value;
    this.appService.sendCodeChallenge(payload).subscribe((result: any) => {
      if (result[AppConstant.MESSAGE] == AppConstant.SUCCESS) {
        this.submissionResult = result[AppConstant.DATA];
        this.submitLoading = false
      } else {
        this.submitLoading = false
        this.errorMessage = result[AppConstant.DATA];
        this.closeMessage();
      }
    });
    this.form.reset()
  }
}
