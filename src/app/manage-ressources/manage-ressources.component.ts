import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RessourcesService} from "../rest/ressources.service";
import {Globals} from "../Globals";
import {Ressources} from "../models/Ressources";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import { QuizServiceService } from '../rest/quiz-service.service';
import { Quiz } from '../models/quiz';
import { DialogData } from '../data/data.component';
import { ServicesService } from '../rest/services.service';

export interface TabRessource {
  name: string;
  value: string;
}

@Component({
  selector: 'app-manage-ressources',
  templateUrl: './manage-ressources.component.html',
  styleUrls: ['./manage-ressources.component.scss']
})
export class ManageRessourcesComponent implements OnInit {
  quiz: Quiz[] = [];
  quizSource = new MatTableDataSource(this.quiz);
  displayedColumns: string[] = ['learner', 'hypothese', 'hypotheseSecondaire', 'solution', 'correction', 'actions'];

  constructor(public dialog: MatDialog, public service: QuizServiceService, public global: Globals) { }

  ngOnInit(): void {
    this.quizOfExperience();
  }

  openRessourcesGestion(){
    const dialogRef = this.dialog.open(RessourcesGestion);

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result : ${result}`);
    });
  }

  openRessourcesGroup(quizId: number){
    const dialogRef = this.dialog.open(ressourcesGroup, {
      data: {name: quizId},
    });
    

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result : ${result}`);
    });
  }

  quizOfExperience(){
    this.service.quizOfExperience(this.global.selectExperience).subscribe((data)=>{
      console.log(data);
      this.quiz = data;
      this.quizSource = new MatTableDataSource(this.quiz);
    });
  }

}

@Component({
  selector: 'ressourcesGestion',
  templateUrl: 'ressources.html',
  styleUrls: ['./ressources.scss']
})
export class RessourcesGestion{
  ressourcesForm: FormGroup = this.fb.group({
    ressourceOpen:['', Validators.compose([Validators.required])],
    ressourceClose:['', Validators.compose([Validators.required])],
    importance:['indispensables', Validators.compose([Validators.required])],
  })
  ressources: Ressources[] = [];
  displayedRessources: string[] = ['open', 'close', 'importance', 'actions'];
  ressourcesSource = new MatTableDataSource(this.ressources);

  constructor(private fb: FormBuilder, private service: RessourcesService, public global: Globals, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.getRessources(this.global.selectExperience).subscribe((data)=>{
      this.ressources.splice(0, this.ressources.length);
      this.ressources = data;
      this.ressourcesSource = new MatTableDataSource(this.ressources);
    })
  }



  onSubmitForm() {
    let ressource = {ressourceOpen : this.ressourcesForm.value.ressourceOpen, ressourceClose : this.ressourcesForm.value.ressourceClose,
      importance: this.ressourcesForm.value.importance};
    this.service.addRessources(this.global.selectExperience, ressource).subscribe((data)=>{
      this.ressources.splice(0, this.ressources.length);
      this.ressources = data;
      this.ressourcesSource = new MatTableDataSource(this.ressources);
    });
    this.ressourcesForm.reset();
    this.openSnackBar("Ressource ajoutée", "fermer");
  }

  onDeleteRessource(ressource: Ressources){
    console.log(ressource.ressourcesId);
    //@ts-ignore
    this.service.deleteRessources(ressource.ressourcesId)
    this.ressources = this.ressources.filter(function(item) {
      return item !== ressource
    })
  }

  onUpdateRessource(ressource: Ressources){
    this.service.putRessources(this.global.selectExperience, ressource).subscribe((data) =>{
      this.ressources.splice(0, this.ressources.length);
      this.ressources = data;
      this.ressourcesSource = new MatTableDataSource(this.ressources);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5*1000,
    });
  }
}

@Component({
  selector: 'ressourcesGroup',
  templateUrl: 'manage-ressources-group.html',
  styleUrls: ['./manage-ressources-group.scss']
})
export class ressourcesGroup{
  constructor(private ressourceService: RessourcesService, public global: Globals, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<ManageRessourcesComponent>, public service: ServicesService) {}
  displayedRessources: string[] = ['name','value'];
  ressources: TabRessource[] = [];
  dataTime:any;
  dataCount:any;
  keyTime:any;
  keyCount:any;
  ressourceSource = new MatTableDataSource(this.ressources);
  ngOnInit(): void {
    this.service.ressourceOfSession(Number(this.data.name)).subscribe((data: any)=>{
      let tb_clee=Object.keys(data);
      this.ressources.splice(0, this.ressources.length);
      this.keyCount = Object.keys(data.count);
      this.keyTime = Object.keys(data.Time);
      this.dataCount = data.count;
      this.dataTime = data.Time;
      console.log(this.dataTime, this.dataCount);
      for (let i=0; i< tb_clee.length; i++) {
        if(tb_clee[i]!="count" && tb_clee[i]!="Time")
        this.ressources.push({name: tb_clee[i], value: data[tb_clee[i]]});
      }
      this.ressourceSource = new MatTableDataSource(this.ressources);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
