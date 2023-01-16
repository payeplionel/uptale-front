import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { Globals } from '../Globals';
import { SessionService } from '../rest/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyseComponent } from '../analyse/analyse.component';

@Component({
  selector: 'app-list-learner',
  templateUrl: './list-learner.component.html',
  styleUrls: ['./list-learner.component.scss']
})
export class ListLearnerComponent implements OnInit {
  @Input() listSource = new MatTableDataSource(this.global.session);

  displayedColumns: string[] = ['firstname', 'lastname', 'utility', 'actions', 'date'];

  constructor(public global: Globals, public sessionService: SessionService, private _snackBar: MatSnackBar, public analyse: AnalyseComponent) { }

  ngOnInit(): void {
  }


  changeUseful(sessionId : number){
    let resp = this.sessionService.updateUsefulness(this.global.selectExperience, sessionId, this.global.selectGroup.groupId);
    resp.subscribe((data:any) => {
        this.global.session = data;
        this.listSource = new MatTableDataSource(this.global.session);
        this.global.dataNumberTag.splice(0, this.global.dataNumberTag.length);
        this.global.dataLabelTag.splice(0, this.global.dataLabelTag.length);

        let chartStatus = Chart.getChart("myChart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        this.analyse.changeScene(this.global.selectScene);
        this.analyse.graphNumberTags(this.global.selectGroup);
        this.analyse.listTagsChosen(this.global.selectGroup.groupId);
    })

}

changeNames(id: number, firstname: string, lastname: string){
  let resp = this.sessionService.updateLearner(id,lastname, firstname);
  resp.subscribe((data: any) => {
      this._snackBar.open('Sauvegarder !','fermer',{
          duration: 2000,
      });
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.listSource.filter = filterValue.trim().toLowerCase();
}


}
