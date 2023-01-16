import { Component, Input, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import { FormQuizService } from '../rest/form-quiz.service';
import { ServicesService } from '../rest/services.service';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})
export class QuizQuestionsComponent implements OnInit {
  constructor(public service:ServicesService, public global:Globals, public quiz: FormQuizService, public stat: StatsComponent) { }

  ngOnInit(): void {
    if(this.global.selectExperience == undefined){
      let resp = this.service.getDatas();
      this.global.experiences.splice(0, this.global.experiences.length);
      resp.subscribe((data: any) => {
        this.global.experiences=data;
        this.global.selectExperience=this.global.experiences[0].experienceId;
        this.stat.initializationGraph(this.global.selectExperience);
      })  
    }else{
      this.stat.initializationGraph(this.global.selectExperience);
    }
  }
}

