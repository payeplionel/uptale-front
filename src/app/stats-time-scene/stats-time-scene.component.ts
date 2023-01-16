import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Globals } from '../Globals';
import { SceneService } from '../rest/scene.service';
import { ServicesService } from '../rest/services.service';


@Component({
  selector: 'app-stats-time-scene',
  templateUrl: './stats-time-scene.component.html',
  styleUrls: ['./stats-time-scene.component.scss']
})
export class StatsTimeSceneComponent implements OnInit {
  @Input() experience!: string; 

  constructor(public global: Globals, public sceneService: SceneService, public service: ServicesService) { }

  ngOnInit(): void {
    this.global.loadingTime= true;
  }
  

  
}
