import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginWithUsernameAndPassword(username:string, password:string){
    const url = environment.baseUrl + '/login/';
    const body = {
      "username" : username,
      "password" : password,
    }
    return lastValueFrom(this.http.post(url,body))
  }
}
