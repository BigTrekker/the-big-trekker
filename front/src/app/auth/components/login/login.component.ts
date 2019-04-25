import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // this.http.get()
  }

  async login() {
    await this.authService.login();
    this.router.navigate(['/']);
  }
}
