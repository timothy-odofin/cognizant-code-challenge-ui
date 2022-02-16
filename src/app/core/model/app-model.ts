export class TasksResponse {
    id: number
    description: string
    name: string
}
export class Language{
    name:string 
    versionIndex:number
}
export class TaskReportResponse{
    username:string
    successCount:number
    tasks:string
}
export class SubmissionOutcome{
    expectedOutput:string
    userOutput:string
    remark:string
}
export class CompileUiPayload{
    username:string 
    script:string 
    language:string
    taskId:number
}