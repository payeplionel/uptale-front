import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap } from 'rxjs';
import { Journey } from '../models/journey';
import {Globals} from "../Globals";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  private localurl = environment.apiurl;

  constructor(private http:HttpClient, public global: Globals) { }

  journeyOfUser(experienceId: string, sessionId: number):Observable<Journey[]>{
    return this.http.get<Journey[]>(this.localurl+'experience/journey?experience='+experienceId+'&session='+sessionId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Journey[]|Journey|undefined) {

  }
}
