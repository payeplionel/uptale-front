import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import {Globals} from "../Globals";
import {Session} from "../models/session";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FormQuizService {
  private localurl = environment.apiurl;

  constructor(private http:HttpClient, public global: Globals) { }

  getRessourcesTime(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(`${this.localurl}experience/ressources/time?experience=${experienceId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  
  getCycle(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/group/cycle?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getGenre(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/group/genre?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getExperience(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/group/experiences?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getManageAnswer(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/answer/manage?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateAnswer(experienceId: string, answer: any):Observable<string[]>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<string>(this.localurl+'experience/answer/update?experience='+experienceId, answer,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStatsInformatonEtudiant(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/stats?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStatsImpressionEtudiant(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/stats/impression?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStatsExperienceEtudiant(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/stats/experiences?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStatsInformationExperience(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/stats/informationexperience?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStatsAvis(experienceId: string):Observable<string[]>{
    return this.http.get<string[]>(this.localurl+'experience/quiz/stats/avis?experience='+experienceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  sendMails(experienceId: string, start: Date, end: Date, link: string):Observable<string>{
    return this.http.get<string>(this.localurl+'experience/sendMails?experience='+experienceId+"&start="+
      start.toLocaleDateString()+"&end="+end.toLocaleDateString()+"&link="+link).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  sendMailsSpecific(experienceId: string, session: Session[], link: string):Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<string>(this.localurl+'experience/sendMails/specific?experience='+experienceId+"&link="+link,
      session, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: string[]|string|undefined) {

  }
}
