import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../Globals';

@Component({
  selector: 'app-choice-scene',
  templateUrl: './choice-scene.component.html',
  styleUrls: ['./choice-scene.component.scss']
})
export class ChoiceSceneComponent implements OnInit {
  @Input() chooseSource = new MatTableDataSource(this.global.numberTags); 

  displayedColumnsTags: string[] = ['position', 'name', 'pourcentage'];
  
  constructor(public global: Globals) { }

  ngOnInit(): void {
  }

  showLegend(){
    this.global.hideLegend=!this.global.hideLegend;
}
}
