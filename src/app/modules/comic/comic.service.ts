import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestUtils } from '../shared/request-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private resourceUrl =  AppConstants.SERVER_API_URL + AppConstants.COMICS_ENDPOINT;

  constructor(private http: HttpClient) { }

  public getAll(params? : any): Observable<any[]> {
    let authParams = RequestUtils.createAuthParamsAndAdd(params);
    return this.http.get<any>(this.resourceUrl, 
      {params: authParams, observe: 'response'})
      .pipe(map((data: any) => data.body));
  }

  public get(id : number): Observable<any> {
    let authParams = RequestUtils.createAuthParams();
    return this.http.get<any>(`${this.resourceUrl}/${id}`, 
      {params: authParams, observe: 'response'})
      .pipe(map((data: any) => data.body));
  }

  public getCharacters(id : number, params? : any): Observable<any> {
    let authParams = RequestUtils.createAuthParamsAndAdd(params);
    return this.http.get<any>(`${this.resourceUrl}/${id}/${AppConstants.CHARACTERS_ENDPOINT}`, 
      {params: authParams, observe: 'response'})
      .pipe(map((data: any) => data.body));
  }

  public getStories(id : number, params? : any): Observable<any> {
    let authParams = RequestUtils.createAuthParamsAndAdd(params);
    return this.http.get<any>(`${this.resourceUrl}/${id}/${AppConstants.STORIES_ENDPOINT}`, 
      {params: authParams, observe: 'response'})
      .pipe(map((data: any) => data.body));
  }
}
