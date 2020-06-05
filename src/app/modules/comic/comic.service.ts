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

  private resourceUrl =  AppConstants.SERVER_API_URL + 'comics';

  constructor(private http: HttpClient) { }

  public getAll(params? : any): Observable<any[]> {
    let authParams = RequestUtils.createAuthParamsAndAdd(params);
    return this.http.get<any>(this.resourceUrl, 
      {params: authParams, observe: 'response'})
      .pipe(map((data: any) => data.body));
  }
}
