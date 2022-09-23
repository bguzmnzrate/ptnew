import { Component, OnInit } from '@angular/core';
//Forms
import { 
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
//Routing
import { Router } from '@angular/router';
//Services
import { AuthFirebaseService } from './services/auth-firebase.service';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  constructor(
    private router: Router,
    private authFS:AuthFirebaseService
  ) { }

  ngOnInit(): void {

  }

  login(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();
    let data=this.form.value;
    this.authFS.login(data)
    .then(()=>{
      Swal.hideLoading();
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 2000
       });
      this.router.navigate(['/dashboard'])
    }).catch((e) =>{
       Swal.hideLoading();
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message
      });
    });
  }

}
