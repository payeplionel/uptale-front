import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap } from 'rxjs';
import { Session } from '../models/session';
import {Globals} from "../Globals";
import { environment } from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private localurl = environment.apiurl;

  constructor(private http:HttpClient, public global: Globals) { }


  getLearnersOfExperience(experience: string, group: number): Observable<Session[]>{
    return this.http.get<Session[]>(this.localurl+'experience/list/learner?experience='+experience+'&group='+group).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateUsefulness(experience: string, sessionId: number, group: number): Observable<Session[]>{
    return this.http.get<Session[]>(this.localurl+'experience/update/useful?session='+sessionId+'&experience='+experience+'&group='+group).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateLearner(id: number, firstname: string, lastname: string){
    return this.http.get(this.localurl+'experience/update/names?learner='+id+'&firstname='+firstname+'&lastname='+lastname)
  }

  sortLearners(experience: string, start: string, end: string){
    return this.http.get<Session[]>(this.localurl+'experience/session/specific?experience='+experience+'&start='+start+'&end='+end).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Session[]| Session |undefined) {

  }
}
