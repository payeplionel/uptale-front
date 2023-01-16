import { Component, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import { Journey } from '../models/journey';
import { EquipService } from '../rest/equip.service';
import { JourneyService } from '../rest/journey.service';
import { ServicesService } from '../rest/services.service';
import { SessionService } from '../rest/session.service';
import {Answers} from "../models/Answers";
import {Equip} from "../models/equip";

export interface journeyOrder {
  name: string;
  order: number;
  count: number;
}

export interface Tile {
  index: number;
  number: number;
  journeys: any;
}


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss', '../../styles.scss']
})
export class JourneyComponent implements OnInit {
  orderSize: Journey[] = [];
  tiles: Tile[] = [];
  journeys: Journey[] = [];
  journeyOrder: journeyOrder[] = [];
  journeySession: Journey[] = [];
  answers: Answers[] = [];
  selectLearner!: number;
  displayedColumns: string[] = ['position', 'scene'];
  displayedColumnsAnswer: string[] = ['question','responses','scene'];
  dataSource = this.journeys;
  eventSource = this.answers;
  max: number =0;


  constructor(private service:ServicesService, private journeyService: JourneyService, public global: Globals,
    private sessionService: SessionService, private equipService: EquipService) { }

  ngOnInit(): void {
      if(this.global.experiences.length == 0 || this.global.groups.length == 0 || this.global.session.length == 0){
        let resp = this.service.getDatas();
        this.global.experiences.splice(0, this.global.experiences.length);
        resp.subscribe((data: any) => {
          this.global.experiences=data;
          this.global.selectExperience=this.global.experiences[0].experienceId;
          this.initialization(this.global.selectExperience);
        })
      }
  }

  changeExperience(idExperience: string){
    this.global.selectExperience=idExperience;
    this.initialization(this.global.selectExperience);
  }
  changeGroupe(group: Equip) {
    this.global.selectGroup=group;
    this.listOfLearners(group.groupId);
  }
  changeLearner(idSession: number){
    this.selectLearner = idSession;
    this.journeyOfUser(idSession);
    this.answerOfUser(idSession);
  }
  initialization(idExperience: string){
    this.equipService.getGroups(idExperience).
    subscribe((data: any) => {
      this.global.groups=data;
      this.global.selectGroup=this.global.groups[0];
      this.listOfLearners(this.global.selectGroup.groupId);
    })
  }
  listOfLearners(group: number){
    this.sessionService.getLearnersOfExperience(this.global.selectExperience, group)
    .subscribe((data: any) => {
        this.global.session=data;
        this.selectLearner = this.global.session[0].sessionId;
        this.journeyOfUser(this.selectLearner);
        this.answerOfUser(this.selectLearner);
    })
  }

  journeyOfUser(sessionId: number){
    let resp = this.journeyService.journeyOfUser(this.global.selectExperience,sessionId);
    resp.subscribe((data: any) =>{
      this.journeys = data;
      this.dataSource = this.journeys;
      this.journeyOfGroup();
    })
  }

  journeyOfGroup(){
    let i = 0;
    this.journeyOrder.splice(0, this.journeyOrder.length);
    this.orderSize.splice(0, this.orderSize.length);
    while(i<this.global.session.length){
      this.journeyService.journeyOfUser(this.global.selectExperience,this.global.session[i].sessionId)
      .subscribe((data: any) =>{
        this.journeySession = data;

        if(this.orderSize.length<this.journeySession.length){
          this.orderSize = this.journeySession;
        }

        let j = 0;
        while(j<this.journeySession.length){
          if(this.journeySession[j] != null){
            let index = this.journeyOrder.find(({name, order}) => (name == this.journeySession[j].name ) && (order == j))
            if(index == undefined){
              this.journeyOrder.push({name: this.journeySession[j].name,order: j ,count: 1});
            }else {
              index.count += 1;
            }
          }
          j++;
          if(j==this.journeySession.length){
            this.journeyOrder.sort(function (x, y) {
              return x.order - y.order;
            });

            this.tiles.splice(0,this.tiles.length);
            this.orderJourney(this.orderSize.length);
          }
        }
      })
      i++;
    }
  }

  orderJourney(size:number){
    for(let i = 0; i<size; i++){
      let journey = this.journeyOrder.filter((journey) => journey.order == i);
      let count = 0;
      for(let i = 0; i<journey.length; i++){
        count++;
      }
      if(count>this.max){
        this.max = count;
      }
      this.tiles.push({index: i+1, number: count, journeys: journey})
    }
  }

  answerOfUser(sessionId: number){
    let resp = this.service.answerOfUser(sessionId);
    resp.subscribe((data: any) =>{
      this.answers = data;
      this.eventSource = this.answers;
    })
  }
}


