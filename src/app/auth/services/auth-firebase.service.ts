import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState
} from '@angular/fire/auth';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

 constructor(
  private auth: Auth) {}

  login(loginData: LoginData) {
    return signInWithEmailAndPassword(this.auth, loginData.email, loginData.password);
  }

  /*register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }*/

  logout() {
    return signOut(this.auth);
  }

  isLogged(): Observable<any>{
    return authState(this.auth)
  }

}
