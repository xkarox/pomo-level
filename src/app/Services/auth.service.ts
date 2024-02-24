import { Injectable } from '@angular/core';
import {Login} from "../login";
import {HelperService} from "./helper.service";
import {API_URL, SetUsername, USERNAME} from "../Types/global";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = API_URL;
  Username = ""

  constructor(private helper: HelperService) { }

  async Login(login: Login){
    const response = await fetch(this.apiUrl + 'login', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body: JSON.stringify(login),
    }).then(() => {
      SetUsername(login.username);
      return this.helper.isCookiePresent('token');
    });

  }

  async Register(login: Login){
    const response = await fetch(this.apiUrl + 'register', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body: JSON.stringify(login),
    }).then(() => {
      SetUsername(login.username);
      return this.helper.isCookiePresent('token');
    });
  }

  async CheckToken() : Promise<boolean>{
    let returnValue = false;
    if(this.helper.isCookiePresent('token')){
      const response = await fetch(this.apiUrl + 'refreshToken', {
        mode: 'no-cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
      }).then(() => {
        if(localStorage.getItem('username') != null){
          const username = localStorage.getItem('username');
          if(username != null){
            SetUsername(username);
          }
        }
        returnValue = true;
      })
    }
    return returnValue
  }

  async RefreshToken() : Promise<boolean>{
    let returnValue = false;
    const response = fetch(this.apiUrl + 'refreshToken', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
    }).then((response) => {
      returnValue = response.status === 200;
    })
    return returnValue
  }

  Logout() {
    fetch(this.apiUrl + 'logout', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:'include',
    }).then( () => {
      return
    })
  }
}
