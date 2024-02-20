import { Injectable } from '@angular/core';
import {Login} from "../login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/';

  constructor() { }

  async login(login: Login){
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

    //check if cookie is set
    // const response2 = await fetch(this.apiUrl + 'changeLevel', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials:'include',
    //   body: JSON.stringify({"level" : 69, "exp" : 420})
    // })
  }
}
