import { Injectable } from '@angular/core';
import {Login} from "../login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/';

  constructor() { }

  async login(login: Login){

    //TODO: check how to set cookie HINT: cors
    const response = await fetch(this.apiUrl + 'login', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })

    //check if cookie is set
    const response2 = await fetch(this.apiUrl + 'changeLevel', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"level" : 69, "exp" : 420})
    })
  }
}
