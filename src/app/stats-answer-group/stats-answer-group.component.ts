import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../Globals';
import { SceneService } from '../rest/scene.service';
import { ServicesService } from '../rest/services.service';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-stats-answer-group',
  templateUrl: './stats-answer-group.component.html',
  styleUrls: ['./stats-answer-group.component.scss']
})
export class StatsAnswerGroupComponent implements OnInit {
  displayedAnswer: string[] = ['answer', 'response', 'count', 'group'];
  @Input() answerSource = new MatTableDataSource(this.global.dataAnswers); 

  constructor(public global: Globals, public service: ServicesService, public sceneService: SceneService) { }

  ngOnInit(): void {
  }

}
