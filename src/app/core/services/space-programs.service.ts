import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonConstants } from './../../constants/common.constants';
import { environment } from './../../../environments/environment';
import { apiEndPointConstants } from './../../constants/api-end-point.constants';

@Injectable()
export class SpaceProgramsService {

  constructor( private httpClient: HttpClient ) { }

  public getSpaceProgramsListing(
    { ...filterOption }
  ): Observable<any> {
    const apiUrl = `${environment.apiUrl}${CommonConstants.currentApiVersion}${apiEndPointConstants.launches}`;
    return this.httpClient.get( apiUrl, { params: filterOption } );
  }
}
