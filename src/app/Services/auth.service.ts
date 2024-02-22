import { Injectable } from '@angular/core';
import {Login} from "../login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/';

  constructor() { }

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
      console.log("login successful")

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
      console.log("registration successful")
    });
  }

  async CheckToken() : Promise<boolean>{
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
}
