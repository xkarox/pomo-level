import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private static EXP_MULTIPLIER = 1.5;
  constructor() { }

  public GetExperienceNeeded(level: number){
    return Math.round(level * level * level);
  }

  public SetCurrentExperience(exp: number) : boolean{
    localStorage.setItem('exp', String(exp));
    return true;
  }

  public AddExperience(exp: number) : boolean {
    exp = exp * LevelService.EXP_MULTIPLIER;

    let expInStorage = localStorage.getItem('exp');
    if(expInStorage != null){
      let newExp = exp + parseInt(expInStorage);

      newExp = this.CheckLevelUp(newExp);

      localStorage.setItem('exp', String(newExp));
      return true;
    }
    return false;
  }

  private CheckLevelUp(exp: number){
    let level = localStorage.getItem('level');
    let expNeeded = this.GetExperienceNeeded(parseInt(level!));

    if(exp >= expNeeded){
      level = String(parseInt(level!) + 1);
      localStorage.setItem('level', level);

      let newExp = exp - expNeeded;
      newExp = this.CheckLevelUp(newExp);
      return newExp;
    }

    return exp;
  }

  public GetCurrentExperience() {
    const expNeeded = localStorage.getItem('exp');
    if(expNeeded == null){
      localStorage.setItem('exp', "0");
      return "0"
    }
    return expNeeded
  }

  public GetLevel(){
    const level = localStorage.getItem('level');
    if(level == null){
      localStorage.setItem('level', "1");
      return "1";
    }
    return level;
  }

  public SetLevel(level: number) : boolean {
    localStorage.setItem('level', String(level));

    return true;
  }
}
