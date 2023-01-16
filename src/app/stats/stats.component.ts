import { Component, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from '../rest/services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataDialog } from '../data/data.component';
import { MatTableDataSource } from '@angular/material/table';
import { SceneService } from '../rest/scene.service';
import { Chart } from 'chart.js';
import { FormQuizService } from '../rest/form-quiz.service';
import { EquipService } from '../rest/equip.service';

export interface TabRessource {
  name: string;
  value: string;
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  choice: number = 0;
  answerSource= new MatTableDataSource(this.global.dataAnswers);
  cycleLoading: boolean = true;
  genreLoading: boolean = true;

  constructor(public global: Globals, public service: ServicesService, public dialog: MatDialog,
    public sceneService: SceneService, public quiz: FormQuizService, public equipService: EquipService) { }

  ngOnInit(): void {
    if(this.global.experiences.length == 0){
      let resp = this.service.getDatas();
      this.global.experiences.splice(0, this.global.experiences.length);
      resp.subscribe((data: any) => {
        this.global.experiences=data;
        this.global.selectExperience=this.global.experiences[0].experienceId;
        this.initializationAnswer(this.global.selectExperience);
        this.origin(this.global.selectExperience);
      })
    }else{
      /*this.initializationAnswer(this.global.selectExperience);*/
      /*this.initializationTime(this.global.selectExperience);*/
    }
  }

  changeExperience(idExperience: string){
    this.global.selectExperience=idExperience;
    if(this.choice == 0){
      this.initializationAnswer(this.global.selectExperience);
      this.initializationGraph(this.global.selectExperience);
    }else if(this.choice == 1){
      this.initializationTime(this.global.selectExperience);
    }
  }

  origin(idExperience: string){
    this.equipService.getGroups(idExperience).
    subscribe((data: any) => {
        this.global.groups.splice(0, this.global.groups.length);
        this.global.groups=data;
        this.global.selectGroup=this.global.groups[0];
        this.global.scenes.splice(0, this.global.scenes.length);
    })
}

  initializationAnswer(experience: string){
    this.global.dataAnswers.splice(0,this.global.dataAnswers.length);
    this.global.loadingAnswer= true;
    this.sceneService.getAnswerGroup(experience).subscribe((data)=> {
      for(let i = 0; i<data.length; i++){
        let str: string[] = data[i].split(',');
        this.global.dataAnswers.push({answer: str[2], response: str[0], count: str[1], group: str[3]});
      }
      this.answerSource = new MatTableDataSource(this.global.dataAnswers);
      this.global.loadingAnswer= false;
    })
  }

  initializationGraph(experienceId: string){
    this.cycleLoading = true;
    this.genreLoading = true;
    this.quiz.getCycle(experienceId).subscribe((data) => {
      this.global.graphCycle.splice(0,this.global.graphCycle.length);
      let labelCyle: string[] = [];
      let value: number[] = [];
      for(let i = 0; i<data.length; i++){
        if(data[i].split(',')[0] == 'null'){
          labelCyle.push("Aucune réponse ");
        }
        if(data[i].split(',')[0] == 'false'){
          labelCyle.push("Mauvaises réponses ");
        }
        if(data[i].split(',')[0] == 'true'){
          labelCyle.push("Bonne réponses ");
        }
        value.push(parseInt(data[i].split(',')[1]));
      }
      console.log(data)
      console.log(labelCyle)
      console.log(value)
      let chartStatus = Chart.getChart("chartCycle");
      if (chartStatus != undefined) {
          chartStatus.destroy();
      }
      this.cycleLoading = false;
      this.actualisationGraphCycle(labelCyle, value);
    });
    this.quiz.getGenre(experienceId).subscribe((data) => {
      this.global.graphGenre.splice(0,this.global.graphGenre.length);
      let label: string[] = [];
      let value: number[] = [];
      for(let i = 0; i<data.length; i++){
        label.push(data[i].split(',')[1]);
        value.push(parseInt(data[i].split(',')[0]));
      }
      let chartStatus = Chart.getChart("chartGenre");
      if (chartStatus != undefined) {
          chartStatus.destroy();
      }
      this.genreLoading = false;
      this.actualisationGraphGenre(label, value);
    });

  }

  openUploadQuiz(){
    this.dialog.open(DialogQuiz);
  }

  openUploadQuestionnaire(){
    this.dialog.open(DialogQuestionnaire);
  }

  initializationTime(experience: string){
    this.global.loadingTime= true;
    this.global.dataLabelTimeGroup.splice(0, this.global.dataLabelTimeGroup.length);
    this.global.dataNumberTimeGroup.splice(0, this.global.dataNumberTimeGroup.length);

    this.sceneService.getTimeGroup(experience).subscribe( (data: any) =>{
      this.global.loadingTime = false;
      for (let index = 0; index < data.length; index++) {
        this.global.dataLabelTimeGroup.push(data[index].scene+": "+data[index].minutes);
        this.global.dataNumberTimeGroup.push(data[index].secondes);
      }
      this.global.loadingTime= false;
      this.showTimeCanvas();
    })
  }

  showTimeCanvas(){
    let chartStatus = Chart.getChart("time");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    this.actualisationTimeScene(this.global.dataNumberTimeGroup, this.global.dataLabelTimeGroup)
  }

  actualisationTimeScene(data: number[], label: string[]){
    new Chart("time", {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Temps passé sur l\' expérience : '+this.global.selectExperience,
                data: data,
                backgroundColor: [
                    'rgba(255, 159, 243, 0.2)',
                    'rgba(254, 202, 87, 0.2)',
                    'rgba(255, 107, 107, 0.2)',
                    'rgba(72, 219, 251, 0.2)',
                    'rgba(29, 209, 161, 0.2)',
                    'rgba(243, 104, 224, 0.2)',
                    'rgba(255, 159, 67, 0.2)',
                    'rgba(238, 82, 83, 0.2)',
                    'rgba(10, 189, 227, 0.2)',
                    'rgba(16, 172, 132, 0.2)',
                    'rgba(0, 210, 211, 0.2)',
                    'rgba(84, 160, 255, 0.2)',
                    'rgba(95, 39, 205, 0.2)',
                    'rgba(200, 214, 229, 0.2)',
                    'rgba(87, 101, 116, 0.2)',
                    'rgba(1, 163, 164, 0.2)',
                    'rgba(46, 134, 222, 0.2)',
                    'rgba(52, 31, 151, 0.2)',
                    'rgba(131, 149, 167, 0.2)',
                    'rgba(34, 47, 62, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 243, 1)',
                    'rgba(254, 202, 87, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(72, 219, 251, 1)',
                    'rgba(29, 209, 161, 1)',
                    'rgba(243, 104, 224, 1)',
                    'rgba(255, 159, 67, 1)',
                    'rgba(238, 82, 83, 1)',
                    'rgba(10, 189, 227, 1)',
                    'rgba(16, 172, 132, 1)',
                    'rgba(0, 210, 211, 1)',
                    'rgba(84, 160, 255, 1)',
                    'rgba(95, 39, 205, 1)',
                    'rgba(200, 214, 229, 1)',
                    'rgba(87, 101, 116, 1)',
                    'rgba(1, 163, 164, 1)',
                    'rgba(46, 134, 222, 1)',
                    'rgba(52, 31, 151, 1)',
                    'rgba(131, 149, 167, 1)',
                    'rgba(34, 47, 62, 1)'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

  actualisationGraphGenre(label: string[], data: number[]){
    new Chart("chartGenre", {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
              label: 'Nombre de tags cliqués',
              data: data,
              backgroundColor: [
                'rgba(255, 159, 243, 0.3)',
                    'rgba(254, 202, 87, 0.3)',
                    'rgba(255, 107, 107, 0.3)',
                    'rgba(72, 219, 251, 0.3)',
                    'rgba(29, 209, 161, 0.3)',
                    'rgba(243, 104, 224, 0.3)',
                    'rgba(255, 159, 67, 0.3)',
                    'rgba(238, 82, 83, 0.3)',
                    'rgba(10, 189, 227, 0.3)',
                    'rgba(16, 172, 132, 0.3)',
                    'rgba(0, 210, 211, 0.3)',
                    'rgba(84, 160, 255, 0.3)',
                    'rgba(95, 39, 205, 0.3)',
                    'rgba(200, 214, 229, 0.3)',
                    'rgba(87, 101, 116, 0.3)',
                    'rgba(1, 163, 164, 0.3)',
                    'rgba(46, 134, 222, 0.3)',
                    'rgba(52, 31, 151, 0.3)',
                    'rgba(131, 149, 167, 0.3)',
                    'rgba(34, 47, 62, 0.3)'
              ],
              borderColor: [
                'rgba(255, 159, 243, 1)',
                    'rgba(254, 202, 87, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(72, 219, 251, 1)',
                    'rgba(29, 209, 161, 1)',
                    'rgba(243, 104, 224, 1)',
                    'rgba(255, 159, 67, 1)',
                    'rgba(238, 82, 83, 1)',
                    'rgba(10, 189, 227, 1)',
                    'rgba(16, 172, 132, 1)',
                    'rgba(0, 210, 211, 1)',
                    'rgba(84, 160, 255, 1)',
                    'rgba(95, 39, 205, 1)',
                    'rgba(200, 214, 229, 1)',
                    'rgba(87, 101, 116, 1)',
                    'rgba(1, 163, 164, 1)',
                    'rgba(46, 134, 222, 1)',
                    'rgba(52, 31, 151, 1)',
                    'rgba(131, 149, 167, 1)',
                    'rgba(34, 47, 62, 1)'
              ],
              borderWidth: 1
            }]
          },
        options: {
            scales: {
                y: {
                    display: false
                },
                x:{
                 display:false
                }
            },
            plugins:{
                legend: {
                    display:false
                }
            }
        }
    });

  }

  actualisationGraphCycle(label: string[], data: number[]){
    new Chart("chartCycle", {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
              label: 'Nombre de tags cliqués',
              data: data,
              backgroundColor: [
                'rgba(255, 159, 243, 0.3)',
                    'rgba(254, 202, 87, 0.3)',
                    'rgba(255, 107, 107, 0.3)',
                    'rgba(72, 219, 251, 0.3)',
                    'rgba(29, 209, 161, 0.3)',
                    'rgba(243, 104, 224, 0.3)',
                    'rgba(255, 159, 67, 0.3)',
                    'rgba(238, 82, 83, 0.3)',
                    'rgba(10, 189, 227, 0.3)',
                    'rgba(16, 172, 132, 0.3)',
                    'rgba(0, 210, 211, 0.3)',
                    'rgba(84, 160, 255, 0.3)',
                    'rgba(95, 39, 205, 0.3)',
                    'rgba(200, 214, 229, 0.3)',
                    'rgba(87, 101, 116, 0.3)',
                    'rgba(1, 163, 164, 0.3)',
                    'rgba(46, 134, 222, 0.3)',
                    'rgba(52, 31, 151, 0.3)',
                    'rgba(131, 149, 167, 0.3)',
                    'rgba(34, 47, 62, 0.3)'
              ],
              borderColor: [
                'rgba(255, 159, 243, 1)',
                    'rgba(254, 202, 87, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(72, 219, 251, 1)',
                    'rgba(29, 209, 161, 1)',
                    'rgba(243, 104, 224, 1)',
                    'rgba(255, 159, 67, 1)',
                    'rgba(238, 82, 83, 1)',
                    'rgba(10, 189, 227, 1)',
                    'rgba(16, 172, 132, 1)',
                    'rgba(0, 210, 211, 1)',
                    'rgba(84, 160, 255, 1)',
                    'rgba(95, 39, 205, 1)',
                    'rgba(200, 214, 229, 1)',
                    'rgba(87, 101, 116, 1)',
                    'rgba(1, 163, 164, 1)',
                    'rgba(46, 134, 222, 1)',
                    'rgba(52, 31, 151, 1)',
                    'rgba(131, 149, 167, 1)',
                    'rgba(34, 47, 62, 1)'
              ],
              borderWidth: 1
            }]
          },
        options: {
            scales: {
              y: {
                  display: false
                },
                x:{
                display:false
              }
            },
            plugins:{
                legend: {
                    display:false
                }
            }
        }
    });

  }

  onChoice(num : number){
    if(this.choice != num){
      this.choice = num;
      if(this.choice == 1){
        this.initializationTime(this.global.selectExperience);
      }
    }else{
      this.choice = 0;
    }
  }
}

@Component({
  selector: 'dialog-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class DialogQuiz {
  exportFileForm!: FormGroup;
  constructor(public global: Globals, public service: ServicesService, public dialogRef: MatDialogRef<DataDialog>){
    this.exportFileForm = new FormGroup ({
      file: new FormControl('', Validators.required),
      fileSource: new FormControl('', Validators.required),
    });
  }

  onSubmitForm() {
    let data : any;
    data=this.exportFileForm.value;
    if(data.file.length > 0){
      this.global.loadingQuiz = true;
      this.service.addQuiz(this.global.selectExperience,data.fileSource)
      .subscribe((data) =>{
        this.global.loadingQuiz = false;
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
  selector: 'dialog-questionnnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class DialogQuestionnaire {
  displayedRessources: string[] = ['name','value'];
  ressources: TabRessource[] = [];
  dataTime:any;
  dataCount:any;
  keyTime:any;
  keyCount:any;
  loading: boolean = false;
  ressourceSource = new MatTableDataSource(this.ressources);
  constructor(public global: Globals, public quizService: FormQuizService) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.loading = true;
    this.quizService.getRessourcesTime(this.global.selectExperience).subscribe((data: any)=>{
      console.log(data);
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
      this.loading = false;
    })
  }
}
