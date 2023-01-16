import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { AnalyseComponent } from '../analyse/analyse.component';
import { Globals } from '../Globals';

@Component({
  selector: 'app-time-scene',
  templateUrl: './time-scene.component.html',
  styleUrls: ['./time-scene.component.scss']
})
export class TimeSceneComponent implements OnInit {
  @Input() timeSource = new MatTableDataSource(this.global.time);

  displayerdColumnsNumber: string[] = ['fistname', 'lastname', 'count'];

  constructor(public global: Globals, public analyse: AnalyseComponent) { }

  ngOnInit(): void {
  }


  viewTime(){
      if(this.global.hideTime==false){
          this.global.hideTime=true;
          let chartStatus = Chart.getChart("myChart2");
          if (chartStatus != undefined) {
              chartStatus.destroy();
          }
          this.analyse.changeScene(this.global.selectScene);
      }else{
          this.global.hideTime=false;
      }
  }
  globalTime(){
    let chartStatus = Chart.getChart("myChart2");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    this.analyse.globalTime();
  }
}
