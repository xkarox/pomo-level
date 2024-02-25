import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-register-form',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  @Output()
  public SuccessfullyRegistered = new EventEmitter<void>
  @Output()
  public CloseRegisterForm = new EventEmitter<void>

  ngOnInit() {
    const element = document.getElementById('register-form-button');
    element?.focus();
  }

  constructor(private authService: AuthService) {
  }



  Close() {
    setTimeout(() => {
      this.RemoveEmptyStyle();
    }, 100)
    this.CloseRegisterForm.emit();
  }

  Register(username : string, password : string) {
    let loginEmpty: boolean = this.CheckIfRegistrationIsEmpty(username, password);
    if(loginEmpty) {
      this.SetUsernameEmptyStyle();
      this.SetPasswordEmptyStyle();
      return;
    }

    this.authService.Register({
      username: username,
      password: password
    }).then(() => {
      this.Close();
      this.SuccessfullyRegistered.emit();
    }).catch( () => {
      this.SetUsernameEmptyStyle();
      this.SetPasswordEmptyStyle();
    });
  }

  CheckIfRegistrationIsEmpty(username : string, password : string) {
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

  CheckIfPasswordsMatch(password : string, rePassword : string) {
    if(password != rePassword) {
      this.SetPasswordEmptyStyle();
      return true;
    }
    return false;
  }
  CheckIfUsernameExists(username: string){
    //todo check if username exists
    return
  }


  SetUsernameEmptyStyle(){
    const element = document.getElementsByClassName("username-field");
    element[1].classList.add("emptyError");
  }

  SetPasswordEmptyStyle(){
    const element = document.getElementsByClassName("password-field");
    element[1].classList.add("emptyError");
    element[2].classList.add("emptyError");
  }

  RemoveEmptyStyle(){
    const element = document.getElementsByClassName("username-field");
    element[1].classList.remove("emptyError");
    const element2 = document.getElementsByClassName("password-field");
    element2[1].classList.remove("emptyError");
    element2[2].classList.remove("emptyError");
  }

}
