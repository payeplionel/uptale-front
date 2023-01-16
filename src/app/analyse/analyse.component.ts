import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'node_modules/chart.js';
import { ServicesService } from '../rest/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LearnerExperience } from '../models/learnerExperience';
import { Equip } from '../models/equip';
import { Globals } from '../Globals';
import { SceneService } from '../rest/scene.service';
import { SessionService } from '../rest/session.service';
import { EquipService } from '../rest/equip.service';
export interface learners {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    utility: string;
    date: string;
}

export interface Legend{
    id: number;
    name: string;
    status: boolean;
}

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss', '../../styles.scss']
})
export class AnalyseComponent implements OnInit {
    learners!: LearnerExperience[];
    dataLabelTime: string[] = [];
    legendData: Legend[] = [];
    displayerdLegend: string[] = ['name', 'status'];
    typeTime = "Temps global";

    dataSource= new MatTableDataSource(this.global.session);
    chooseSource = new MatTableDataSource(this.global.numberTags);
    tagSource = new MatTableDataSource(this.global.tag);
    timeSource = new MatTableDataSource(this.global.time);
    legendSource = new MatTableDataSource(this.legendData);

    constructor(private service:ServicesService, private _snackBar: MatSnackBar, public global: Globals,
        private sceneService: SceneService, private sessionService: SessionService, private equipService: EquipService) {
    }

    ngOnInit(): void {
        if(this.global.experiences.length == 0 || this.global.groups.length == 0 || this.global.scenes.length == 0){
            let resp = this.service.getDatas();
            this.global.experiences.splice(0, this.global.experiences.length);
            resp.subscribe((data: any) => {
              this.global.experiences=data;
              this.global.selectExperience=this.global.experiences[0].experienceId;
              this.origin(this.global.selectExperience);
            })
        }else{
            this.changeScene(this.global.selectScene);
            this.graphNumberTags(this.global.selectGroup);
            this.listTagsChosen(this.global.selectGroup.groupId)
        }

    }

    changeScene(id: number){
        let resp_scenes = this.service.timeBethweenScene(this.global.selectExperience,id, this.global.selectGroup.groupId);
        this.global.dataNumberTime.splice(0, this.global.dataNumberTime.length);
        this.dataLabelTime.splice(0, this.dataLabelTime.length);
        this.global.time.splice(0, this.global.time.length);
        resp_scenes.subscribe((data: any) => {
            for (let index = 0; index < data.length; index++) {
                this.global.dataNumberTime.push(data[index].secondes);
                this.dataLabelTime.push(data[index].lastname+" "+data[index].firstname+" : "+data[index].minutes);
                this.global.time.push({firstname: data[index].firstname, lastname: data[index].lastname, count: data[index].minutes});
            }
            let chartStatus2 = Chart.getChart("myChart2");
            if (chartStatus2 != undefined) {
                chartStatus2.destroy();
            }

            this.timeSource = new MatTableDataSource(this.global.time);
            this.global.selectScene=id;
            let sceneName = this.global.scenes.filter((scene) => scene.sceneId == id);
            this.actualisationTimeScene(this.global.dataNumberTime, this.dataLabelTime, sceneName[0].sceneName);
            this.listTagsChosen(this.global.selectGroup.groupId);
        })
    }

  globalTime(){
    if(this.typeTime=="Temps global"){
        let resp_scenes = this.service.timeBethweenGlobal(this.global.selectExperience, this.global.selectGroup.groupId);
        this.global.dataNumberTime.splice(0, this.global.dataNumberTime.length);
        this.dataLabelTime.splice(0, this.dataLabelTime.length);
        this.global.time.splice(0, this.global.time.length);
        resp_scenes.subscribe((data: any) => {
          for (let index = 0; index < data.length; index++) {
            this.global.dataNumberTime.push(data[index].secondes);
            this.dataLabelTime.push(data[index].lastname+" "+data[index].firstname+" : "+data[index].minutes);
            this.global.time.push({firstname: data[index].firstname, lastname: data[index].lastname, count: data[index].minutes});
          }
          let chartStatus2 = Chart.getChart("myChart2");
          if (chartStatus2 != undefined) {
            chartStatus2.destroy();
          }
    
          this.timeSource = new MatTableDataSource(this.global.time);
          this.actualisationTimeScene(this.global.dataNumberTime, this.dataLabelTime, this.global.selectExperience);
          this.listTagsChosen(this.global.selectGroup.groupId);
        })
        this.typeTime = "Temps par scène";
    }else{
        this.changeGroupe(this.global.selectGroup);
        this.typeTime = "Temps global";
    }
    
  }

    changeGroupe(group: Equip) {
        this.global.selectGroup=group;
        this.listOfLearners(group);
        this.global.dataNumberTag.splice(0, this.global.dataNumberTag.length);
        this.global.dataLabelTag.splice(0, this.global.dataLabelTag.length);
        let chartStatus = Chart.getChart("myChart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        this.changeScene(this.global.selectScene);
        this.listTagsChosen(this.global.selectGroup.groupId);
    }

    changeExperience(idExperience: string){
        this.global.selectExperience=idExperience;
        this.origin(this.global.selectExperience);
    }

    origin(idExperience: string){
        this.equipService.getGroups(idExperience).
        subscribe((data: any) => {
            this.global.groups.splice(0, this.global.groups.length);
            this.global.groups=data;
            this.global.selectGroup=this.global.groups[0];
            console.log(`Initialisation ${this.global.groups.length}`);
            this.global.scenes.splice(0, this.global.scenes.length);
            this.listOfLearners(this.global.selectGroup);

            this.sceneService.getScenesOfOneExperienceOptional(idExperience)
            .subscribe((data: any) => {
                this.global.scenes=data;
                this.global.selectScene=this.global.scenes[0].sceneId;
                this.changeScene(this.global.selectScene);
                this.listTagsChosen(this.global.selectGroup.groupId);
            })
        })
    }

    graphNumberTags(group: Equip){
        let resp_number_tags = this.service.numberTagsPerLearner(this.global.selectExperience, group.groupId);
        this.global.dataNumberTag.splice(0, this.global.dataNumberTag.length);
        this.global.dataLabelTag.splice(0, this.global.dataLabelTag.length);
        this.global.tag.splice(0,this.global.tag.length);
        resp_number_tags.subscribe((data: any) => {
            for (let index = 0; index < data.length; index++) {
                this.global.dataNumberTag.push(data[index].count);
                this.global.dataLabelTag.push(data[index].lastname+' '+data[index].firstname);
                this.global.tag.push({firstname: data[index].firstname, lastname: data[index].lastname, count: data[index].count})
            }
            let chartStatus = Chart.getChart("myChart");
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }
            this.actualisationTagClique(this.global.dataLabelTag, this.global.dataNumberTag);
            this.tagSource = new MatTableDataSource(this.global.tag);
        })
    }

    listTagsChosen(group: number){
        this.legendData.splice(0,this.legendData.length);
        let resp = this.service.listTagsChosen(this.global.selectExperience,this.global.selectScene, group);
        resp.subscribe((data: any) => {
            this.global.numberTags.splice(0, this.global.numberTags.length);
            let size = 0;
            for(let key in data) {
                size = data[key]+size;
            }
            for(let key in data) {
                this.global.numberTags.push({name: key,  number: data[key], percent: data[key]/this.global.session.length});
            }
            for (let index = 0; index < data.length; index++) {
                this.legendData.push({id: index, name: data[index].name, status : true});
            }
            this.chooseSource = new MatTableDataSource(this.global.numberTags);
            this.legendSource = new MatTableDataSource(this.legendData);
        })
    }

    listOfLearners(group: Equip){
        this.sessionService.getLearnersOfExperience(this.global.selectExperience, group.groupId)
        .subscribe((data: any) => {
            this.global.session = data;
            this.dataSource = new MatTableDataSource(this.global.session);
            this.graphNumberTags( group);
        })
    }

    actualisationTagClique(label: string[], data: number[]){
        new Chart("myChart", {
            type: 'doughnut',
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

    actualisationTimeScene(data: number[], label: string[], actual: string){
        new Chart("myChart2", {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: 'temps passé sur la scène: '+actual,
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
}
