import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Ressources} from "../models/Ressources";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Equip} from "../models/equip";
import {Experience} from "../models/experience";
import {Globals} from "../Globals";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
  private localurl = environment.apiurl;

  constructor(private http: HttpClient, public global: Globals) { }

  addRessources(experience: string, ressources: any): Observable<Ressources[]>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
      return this.http.post<Ressources>(this.localurl+'experience/ressources/add?experience='+experience, ressources,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getRessources(experience: string): Observable<Ressources[]>{
    return this.http.get<Ressources[]>(this.localurl+'experience/ressources/get?experience='+experience).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  putRessources(experience: string, ressource: Ressources): Observable<Ressources[]>{
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.put<Ressources>(this.localurl+'experience/ressources/put?experience='+experience, ressource,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
    );
  }

  deleteRessources(ressourceId: number): Observable<Ressources[]>{
    return this.http.delete<Ressources>(this.localurl+'experience/ressources/delete?idRessource='+ressourceId).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Ressources[]| Ressources |undefined) {

  }
}
