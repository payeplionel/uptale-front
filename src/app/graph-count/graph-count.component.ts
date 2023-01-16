import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { AnalyseComponent } from '../analyse/analyse.component';
import { Globals } from '../Globals';

@Component({
  selector: 'app-graph-count',
  templateUrl: './graph-count.component.html',
  styleUrls: ['./graph-count.component.scss']
})
export class GraphCountComponent implements OnInit {
  @Input() tagSource = new MatTableDataSource(this.global.tag);

  displayerdColumnsNumber: string[] = ['fistname', 'lastname', 'count'];

  constructor(public global: Globals, public analyse: AnalyseComponent) { }

  ngOnInit(): void {
  }

  viewTag(){
    if(this.global.hideTag==false){
        this.global.hideTag=true;
        this.global.dataNumberTag.splice(0, this.global.dataNumberTag.length);
        this.global.dataLabelTag.splice(0, this.global.dataLabelTag.length);
        let chartStatus = Chart.getChart("myChart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        this.analyse.graphNumberTags(this.global.selectGroup);
    }else{
        this.global.hideTag=false;
    }
}

}
