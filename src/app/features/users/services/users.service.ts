import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Department, GetUsersResponse, Level, PaginatedResponse, User} from '../../../types/types';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface GetUserOptions {
  page: number;
  limit?: number;
  department?: Department;
  level?: Level;
  errorRate?: number;
  delay?: {
    min: number;
    max: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(options: GetUserOptions): Observable<GetUsersResponse> {
    let params = new HttpParams()
      .set('page', options.page || 0)
      .set('limit', options.limit || 20)
    ;

    if (options.delay) {
      params = params.set('delay', `${options.delay.min},${options.delay.max}`);
    }

    if (options.department) {
      params = params.set('department', options.department);
    }

    if (options.level) {
      params = params.set('level', options.level);
    }

    return this.httpClient.get<GetUsersResponse>(`${environment.server}/users`, { params });
  }
}
