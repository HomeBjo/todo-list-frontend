import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
export interface LoginResponse {
  email:string,
  token: string,
  user_id:number,
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  constructor(private as:AuthService, private router : Router ) {}

  async login() {

    try {
      let resp = await this.as.loginWithUsernameAndPassword(this.username,this.password) as LoginResponse
      console.log('response', resp)
      if (resp) {
        localStorage.setItem('token', resp.token);
      } else {
        console.error('Token not found in response');
      }
      // todo: redirect
      this.router.navigateByUrl('/todos')
    } catch (e) {
      alert('falscher login')
      console.error(e);
    }
  }
}
