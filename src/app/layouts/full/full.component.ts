import { Component, OnInit,OnDestroy } from '@angular/core';
//Routing
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, take} from 'rxjs/operators';
//Services
import { AuthFirebaseService } from '../../auth/services/auth-firebase.service';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit,OnDestroy {

  isLogged:any;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private authFS:AuthFirebaseService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    Swal.hideLoading();
    this.authFS.isLogged().pipe(takeUntil(this._unsubscribeAll))
    .subscribe(user=>{
      this.isLogged=user;
      //console.log(this.isLogged)
    })
  }

  logout(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();
    this.authFS.logout()
    .then(() => {
      Swal.hideLoading();
      this.isLogged=false;
      this.router.navigate(['/inicio'])}
    ).catch((e) =>{
       Swal.hideLoading();
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message
      });
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
