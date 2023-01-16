import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ServicesService } from '../rest/services.service';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../Globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { SceneService } from '../rest/scene.service';
import { EquipService } from '../rest/equip.service';
import {FormQuizService} from "../rest/form-quiz.service";
import {SessionService} from "../rest/session.service";
import {Session} from "../models/session";
import { environment } from "../../environments/environment";


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss', '../../styles.scss']
})
export class DataComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  groupsSource = new MatTableDataSource(this.global.groups);
  modal=false;
  value = 'Clear me';
  experience!:number;
  loading:boolean=true;
  pageSize = 15;
  pageMin = 0;
  pageMax = 15;
  pageSizeOptions: number[] = [15, 30, 60, 120];
  pageEvent!: PageEvent;
  constructor(public dialog: MatDialog, private service:ServicesService,
    public global: Globals, private sceneService: SceneService) {   }

  openUploadData(){
    const dialogRef = this.dialog.open(DataDialog);

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result : ${result}`);
      this.showData();
    });
  }

  ngOnInit(): void {
    console.log("varialbles d'env : v3 ");
    this.showData();
  }
  showData(){
  this.service.getDatas().
  subscribe((data: any) => {
      this.global.experiences = data;
    })
  }


  pageNavigate(){
    this.pageMin = this.pageEvent.pageIndex*this.pageEvent.pageSize;
    this.pageMax = (this.pageEvent.pageIndex+1)*this.pageEvent.pageSize;
    this.pageSize = this.pageEvent.pageSize;
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  openManageQuestion() {
    this.dialog.open(ManageQuestion);
  }
}

@Component({
  selector: 'data.dialog',
  templateUrl: 'data.dialog.html',
  styleUrls: ['./data.dialog.scss']
})
export class DataDialog{
  constructor(public dialog: MatDialog,
    private service: ServicesService,
    public dialogRef: MatDialogRef<DataDialog>,
    public global: Globals, private _snackBar: MatSnackBar, private router: Router, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: FormBuilder) {}

  exportFileForm: FormGroup = this.fb.group({
    experienceName: ['', Validators.compose([Validators.required])],
    file: ['', Validators.compose([Validators.required])],
    fileSource: ['', Validators.compose([Validators.required])],
  });


  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5*1000,
  });
}

ngOnInit(): void {
}

onSubmitForm() {
  let data : any;
  data=this.exportFileForm.value;
  if(data.file.length > 0){
    this.global.setisLoading(true);
    this.service.addExperience(data.experienceName,data.fileSource)
    .subscribe(experiences => {
      this.global.experiences = experiences
      this.global.setisLoading(false);
    });
  }
}

filename='Choisissez le fichier';

onFileChange(event:any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.exportFileForm.patchValue({
      fileSource: file
    });
    this.filename = event.target.files[0].name;
  }
}

onNoClick(): void {
    this.dialogRef.close();
}
}


@Component({
  selector: 'dialog-structure-view',
  templateUrl: 'data.view.html',
  styleUrls: ['./data.view.scss']
})
export class DialogStructureView {
  experience:any;
  dataSource = new MatTableDataSource(this.global.scenes);
  displayedColumns: string[] = ['name', 'action', 'weight'];

  constructor(
    public dialogRef: MatDialogRef<DialogStructureView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service:ServicesService, private sceneService: SceneService, public global: Globals,  private _snackBar: MatSnackBar) {
    this.experience=data;
    this.openStructureView(this.experience.id);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  openStructureView(id: any){
    this.experience=id;
    this.global.scenes.splice(0, this.global.scenes.length);
    this.sceneService.getScenesOfOneExperience(id).
      subscribe((data: any) => {
        this.global.scenes = data;
        this.dataSource = new MatTableDataSource(this.global.scenes);
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5*1000,
    });
  }

  changeStatus(sceneId: number){
    let resp = this.sceneService.updateStatus(sceneId, this.experience);
    this.global.scenes.splice(0, this.global.scenes.length);
    resp.subscribe((data: any) => {
      this.global.scenes=data;
      this.dataSource = new MatTableDataSource(this.global.scenes);
    })
  }

  updateScene(sceneId: number, sceneName: string){
    this.global.scenes.splice(0, this.global.scenes.length);
    this.sceneService.updateSceneName(sceneId, this.experience, sceneName).
    subscribe((data: any) => {
      this.global.scenes=data;
      this.dataSource = new MatTableDataSource(this.global.scenes);
      this.openSnackBar("Scène modifiée", "Fermer");
    })
  }
}

@Component({
  selector: 'dialog-structure-view',
  templateUrl: 'data.group.html',
  styleUrls: ['./data.group.scss']
})
export class DialogGroupView {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  experience:any;
  modalGroup=false;
  groupsSource = new MatTableDataSource(this.global.groups);
  constructor(
    public dialogRef: MatDialogRef<DialogStructureView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service:ServicesService, private equipService: EquipService, public global: Globals, public dialog: MatDialog) {
    this.experience=data;
    this.openGroupView(this.experience.id);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  openGroupView(id: any){
    this.experience=id;
    this.modalGroup = true;
    this.global.groups.splice(0, this.global.groups.length);
    this.equipService.getGroups(id).
    subscribe((data: any) => {
      this.global.groups=data;
      this.groupsSource = new MatTableDataSource(this.global.groups);
      this.global.action=false;
    })
  }

  closeModalGroupView(){
    this.modalGroup = false;
  }

  deleteGroups(groupId: number){
    this.global.action=true;
    this.equipService.deleteGroups(this.experience, groupId).
    subscribe(data => {
      this.openGroupView(this.experience);
    })
  }

  updateGroups(groupId: number, update : string){
    this.global.action=true;
    this.equipService.updateGroups(groupId, update).
    subscribe(data => {
      this.global.action=false;
    })
  }
}

@Component({
  selector: 'manage-question',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageQuestion {
  sessionsList: Session[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'actions'];
  sessionssSource = new MatTableDataSource(this.sessionsList);
  answers!: any[];
  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
    // @ts-ignore
    link: new FormControl<string | null>(null),
  });

  exportEmails: FormGroup = this.fb.group({
    link: ['', Validators.compose([Validators.required])],
    start: ['', Validators.compose([Validators.required])],
    end: ['', Validators.compose([Validators.required])],
  });

  constructor(public formService: FormQuizService, public global: Globals, public service: ServicesService,
              private _snackBar: MatSnackBar, private fb: FormBuilder, private sessionService: SessionService){}

  ngOnInit(): void {
    if(this.global.experiences.length == 0 || this.global.groups.length == 0 || this.global.session.length == 0){
      let resp = this.service.getDatas();
      this.global.experiences.splice(0, this.global.experiences.length);
      resp.subscribe((data: any) => {
        this.global.experiences=data;
        this.global.selectExperience=this.global.experiences[0].experienceId;
        this.initialization();
      })
    }else{
      this.initialization();
    }
  }
  changeExperience(idExperience: string){
    this.global.selectExperience=idExperience;
    this.initialization();
  }

  initialization(){
    this.formService.getManageAnswer(this.global.selectExperience).subscribe((data:any) =>{
      for (let i = 0; i<data.length; i++){
        data[i].responses = data[i].responses.filter((value:any, index:any, self: any) =>
          index === self.findIndex((t: any) => (
            t.principal === value.principal && t.secondaire === value.secondaire
          )))
      }
      this.answers = data;
      this.answers.sort((a, b)=>{
        return a.question.localeCompare(b.question, undefined, {
          numeric: true,
          sensitivity: 'base'
        });
      })
    });
  }

  onCheck(answer: any, question: any){
    let data = question.responses;
    let answers = { question : question.question, response: answer.principal, status: answer.secondaire};
    this.formService.updateAnswer(this.global.selectExperience, answers).subscribe();
    for (let i = 0; i<data.length; i++){
      if(data[i].principal != answer.principal){
        if(data[i].secondaire == 'null'){
          data[i].secondaire = 'false';
        }
      }
    }
  }
  
  onSendAnswers(){
    if(this.sessionsList.length == 0){
      this.global.loadingMails = true;
      this.formService.sendMails(this.global.selectExperience, this.exportEmails.value.start, this.exportEmails.value.end, this.exportEmails.value.link).subscribe(
        (data: any) =>{
          this.global.loadingMails = false;
          this.openSnackBar("mails envoyés !", "fermer");
        });
    }else{
      this.global.loadingMails = true;
      this.formService.sendMailsSpecific(this.global.selectExperience, this.sessionsList, this.exportEmails.value.link).subscribe(
        (data: any) =>{
          this.global.loadingMails = false;
          this.openSnackBar("mails envoyés !", "fermer");
        });
    }
  }

  sortSessions(){
    this.sessionService.sortLearners(this.global.selectExperience,this.exportEmails.value.start.toLocaleDateString("fr"), this.exportEmails.value.end.toLocaleDateString("fr"))
      .subscribe((data: any) =>{
        this.sessionsList.splice(0, this.sessionsList.length);
        this.sessionsList = data;
        this.sessionssSource = new MatTableDataSource(this.sessionsList);
      })
  }

  removeSession(session: any){
    this.sessionsList = this.sessionsList.filter(item => item !== session);
    this.sessionssSource = new MatTableDataSource(this.sessionsList);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5*1000,
    });
  }
}







