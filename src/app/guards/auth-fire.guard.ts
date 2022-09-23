import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
//Services
import { AuthFirebaseService } from '../auth/services/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFireGuard implements CanActivate {
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  user:any;

  constructor(
    private router: Router,
    private authFS:AuthFirebaseService) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve, reject) => {
      this.authFS.isLogged().subscribe(user=>{
        if(!user){
          this.router.navigate(['/iniciar-sesion']);
          resolve(false)
        }else{
          //this.router.navigate(['/inicio']);
          resolve(true)
        }
      })
    })
  }
}
