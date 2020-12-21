import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/commons/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUserEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  environmentbackendUrl = 'http://ec2-18-222-177-129.us-east-2.compute.amazonaws.com:8080';

  userIsLoggedIn() {
    return localStorage.getItem('user') != null && localStorage.getItem('user').length > 0;
  }

  getUsername() {
    return localStorage.getItem('user');
  }

  getUser() {
    return this.http.get<User>(this.environmentbackendUrl + '/get-user').pipe(
      map(response => response)
    );
  }

  executeAuthService(username: string, password: string) {

    return this.http.post<LoginResponse>(this.environmentbackendUrl + '/authenticate', {username, password}).pipe(
      map(response => {
        localStorage.setItem('jwt', response.jwt);
        localStorage.setItem('user', response.loggedInUser);
      })
    );
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post(this.environmentbackendUrl + '/signup', {username, email, password}).pipe(
      map(response => response)
    );
  }

  checkUsername(username: string) {
    console.log(username);
    return this.http.post(this.environmentbackendUrl + '/check-username', {username}).pipe(
      map(response => response)
    );
  }
}

interface LoginResponse {
  jwt: string;
  loggedInUser: string;
}
