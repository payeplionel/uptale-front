import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './Globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss']
})
export class AppComponent {
  isChecked:boolean;
  menu = 'Données';
  title = 'uptale';
  selected = 1;
  state = 'large';

  constructor(private router: Router, public global: Globals) {
    this.isChecked=global.isChecked;
  }

  ngOnInit(): void {
  }

  selection(choix: number){
    this.selected = choix;
    if(this.selected == 1){
      this.router.navigate(['/']);
    }else if(this.selected == 2){
      this.router.navigate(['/analyses']);
    }else if(this.selected == 3){
      this.router.navigate(['/parcours']);
    }else if(this.selected == 4){
      this.router.navigate(['/stats']);
    }
  }

  setValue(){
    this.global.setisChecked(!this.global.isChecked)
    this.isChecked=!this.isChecked;
  }

}
