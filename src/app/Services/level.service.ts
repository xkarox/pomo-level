import { Injectable } from '@angular/core';
import {API_URL} from "../Types/global";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private static EXP_MULTIPLIER = 1.5;
  apiUrl = API_URL;
  constructor() { }

  public GetExperienceNeeded(level: number){
    return Math.round(level * level * level);
  }

  public SetCurrentExperience(exp: number, authenticated: boolean) : boolean{
    if(!authenticated){
      localStorage.setItem('exp', String(exp));
      return true;
    }
    //todo api call
    return true
  }

  public AddExperience(exp: number, authenticated: boolean) : boolean {
    exp = exp * LevelService.EXP_MULTIPLIER;
    if(!authenticated){
      let expInStorage = localStorage.getItem('exp');
      if(expInStorage != null){
        let newExp = exp + parseInt(expInStorage);

        newExp = this.CheckLevelUp(newExp, authenticated);

        localStorage.setItem('exp', String(newExp));
        return true;
      }
      return false;
    }

    //todo api call
    return true
  }

  private CheckLevelUp(exp: number, authenticated: boolean) : number {

    let level = localStorage.getItem('level');
    if(authenticated){
      //todo api call
    }
    let expNeeded = this.GetExperienceNeeded(parseInt(level!));

    if(exp >= expNeeded){
      level = String(parseInt(level!) + 1);
      localStorage.setItem('level', level);

      let newExp = exp - expNeeded;
      newExp = this.CheckLevelUp(newExp, authenticated);
      return newExp;
    }

    return exp;
  }

  public GetCurrentExperience(authenticated: boolean) {
      const expNeeded = localStorage.getItem('exp');
      if (authenticated) {
        //todo api call
      }
      if (expNeeded == null) {
        localStorage.setItem('exp', "0");
        return "0"
      }
      return expNeeded
  }

  public GetLevel(authenticated: boolean) : string {
    const level = localStorage.getItem('level');
    if(authenticated){
      //todo api call
    }

    if(level == null){
      localStorage.setItem('level', "1");
      return "1";
    }
    return level;
  }

  public SetLevel(level: number, authenticated: boolean) : boolean {
    if(!authenticated){
      localStorage.setItem('level', String(level));
      return true;
    }
    //todo api call
    return true
  }
}
