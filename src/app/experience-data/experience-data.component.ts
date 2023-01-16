import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogGroupView, DialogStructureView } from '../data/data.component';
import { Globals } from '../Globals';
import { Experience } from '../models/experience';
import { Scene } from '../models/scene';
import { ServicesService } from '../rest/services.service';

let scene: Scene [] = [];
@Component({
  selector: 'app-experience-data',
  templateUrl: './experience-data.component.html',
  styleUrls: ['./experience-data.component.scss', '../../styles.scss']
})
export class ExperienceDataComponent implements OnInit {
  @Input() experience!: Experience; 
  loadingDelete:boolean=false;


  constructor(public dialog: MatDialog,private service: ServicesService, public global: Globals) { }

  ngOnInit(): void {
  }
  onOpenGroupView(id: any){
    const dialogRef = this.dialog.open(DialogGroupView, {
      data: {id: id},
    });
  }

  onOpenAddView(idExperience: string){
    const dialogRef = this.dialog.open(DataAdd,{data: {id:idExperience}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result : ${result}`);
    });
  }

  onOpenStructureView(id:string): void{
    const dialogRef = this.dialog.open(DialogStructureView, {
      width: '60vw',
      data: {id: id},
    });
  }

  onDeleteExperience(idExperience: string){
    this.global.loadingExperience=true;
    this.service.deleteExperience(idExperience).
    subscribe(data => {
      this.global.loadingExperience=false;
     this.service.getDatas().
      subscribe((data: any) => {
        this.global.experiences = data;
      })
    })
  }


}

@Component({
  selector: 'data-add',
  templateUrl: 'data.add.html',
  styleUrls: ['./data.add.scss']
})
export class DataAdd {
  exportFileForm!: FormGroup;
  experience:any;
  dataSource = new MatTableDataSource(scene);
  displayedColumns: string[] = ['position', 'name', 'weight'];

  constructor(
    public dialogRef: MatDialogRef<DialogStructureView>,
    @Inject(MAT_DIALOG_DATA) public data: DataAdd,
    private service:ServicesService, public global: Globals, private _snackBar: MatSnackBar, private router: Router) {
    this.experience=data;
    this.exportFileForm = new FormGroup ({
      file: new FormControl('', Validators.required),
      fileSource: new FormControl('', Validators.required)
    });
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.exportFileForm.patchValue({
        fileSource: file
      });
      this.filename = event.target.files[0].name;
    }
  }
   filename='Choisissez le fichier';
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSubmitForm() {
      let data : any;
      data=this.exportFileForm.value;
      let resp = this.service.addDataExperience(this.experience.id,data.fileSource);
      if(data.file.length > 0){
        this.global.setisLoading(true);
        resp.subscribe({
          next: value => console.log(value),
          error: err =>{
            console.log(err);
            this.global.setisLoading(false);
            this.openSnackBar("Erreur","Valider");
          },
          complete: () => {
            this.global.setisLoading(false);
            this.router.navigateByUrl('data');
            this.openSnackBar("Création terminnée!","Valider");
          }
        });
      }
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 5*1000,
      });
    }

}