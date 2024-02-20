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

  constructor(private authService: AuthService) {
  }


  login(username : string, password : string) {
    const loginModel: Login = {
      username: username,
      password: password
    }
    this.authService.login(loginModel).then(() => {
      this.SuccessfullyLoggedIn.emit();
    });
  }

}
