import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {
  currentUser:IUser

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {

    let loginInfo = { username: userName, password: password };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
    // If there is no error then the stream values flow
    // But if there is an error then we are creating an observable stream which contains just "false" in it
    // implying that authentication failed. So, when the consumer does .subscribe(x=> { // in here he can check if x is false 
    // and if it is then the consumer of this API will know that the authentication failed })
      .pipe(catchError(err => {
        return of(false)        // Create and then return a new observable stream which has 'false' in it
      }))
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
    .pipe(tap(data => {
      if(data instanceof Object) {
        this.currentUser = <IUser>data;
      }
    }))
    .subscribe();
  }

  updateCurrentUser(firstName:string, lastName:string) {
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post('/api/logout', {}, options);
  }
}
