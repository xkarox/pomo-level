import {Component, EventEmitter, Output} from '@angular/core';
import { Login } from "../../login";
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../Services/auth.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule,],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output()
  public SuccessfullyLoggedIn = new EventEmitter<void>
  @Output()
  public CloseLoginForm = new EventEmitter<void>

  constructor(private authService: AuthService) {
  }


  Login(username : string, password : string) {
    if (this.CheckIfLoginIsEmpty(username, password)) {
      return;
    }
    const loginModel: Login = {
      username: username,
      password: password
    }
    this.authService.Login(loginModel).then(() => {
      this.SuccessfullyLoggedIn.emit();
    }).catch( () => {
      this.SetUsernameEmptyStyle();
      this.SetPasswordEmptyStyle();
    });
  }

  Close() {
    setTimeout(() => {
      this.RemoveEmptyStyle();
    }, 100)
    this.CloseLoginForm.emit();
  }

  CheckIfLoginIsEmpty(username : string, password : string) {
    let loginEmpty: boolean = false;

    if(username == "") {
      this.SetUsernameEmptyStyle();
      loginEmpty = true;
    }
    if(password == "") {
      this.SetPasswordEmptyStyle();
      loginEmpty = true;
    }

    return loginEmpty;
  }

  SetUsernameEmptyStyle(){
    const element = document.getElementsByClassName("username-field");
    element[0].classList.add("emptyError");
  }

  SetPasswordEmptyStyle(){
    const element = document.getElementsByClassName("password-field");
    element[0].classList.add("emptyError");
  }

  RemoveEmptyStyle(){
    const element = document.getElementsByClassName("username-field");
    element[0].classList.remove("emptyError");
    const element2 = document.getElementsByClassName("password-field");
    element2[0].classList.remove("emptyError");
  }



}
