import { Component, OnInit, TemplateRef } from '@angular/core';
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
//NgBootstrap
import {
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
//Services
import { ClientesService } from './services/clientes.service';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  customers:any[]=[];
  uuid:string='';

  form=new FormGroup({
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    route:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required)
  });


  //ModalOptions
  modalTitle:string="Crear Cliente";
  action:string="create";
  ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size:'lg'
  };

  constructor(
    private fb: FormBuilder,
    private customerService:ClientesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    //this.searchCustomer('lope');
  }

  createCustomer(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let customer=this.form.value;
    customer.firstname=customer.firstname.toUpperCase();
    customer.lastname=customer.lastname.toUpperCase();
    customer.address=customer.address.toUpperCase();
    /*Object.keys(customer).forEach(function(key, index) {
      console.log(customer[key].toUpperCase())
      customer[key]=customer[key].toUpperCase();
    });*/

    this.customerService.createCustomer(customer).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Cliente creado correctamente',
          showConfirmButton: false,
          timer: 5000
        });
        //this.getCustomers();
        this.form.reset();
    }).catch(err=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
    });
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(data=>{
      this.customers=data;
    },(error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

  updateCustomer(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let customer=this.form.value;
    customer.firstname=customer.firstname.toUpperCase();
    customer.lastname=customer.lastname.toUpperCase();
    customer.address=customer.address.toUpperCase();
    /*Object.keys(customer).forEach(function(key, index) {
      console.log(customer[key].toUpperCase())
      customer[key]=customer[key].toUpperCase();
    });*/

    let uuid=this.uuid;
    this.customerService.updateCustomer(customer,uuid).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado correctamente',
          showConfirmButton: false,
          timer: 5000
        });
        //this.getCustomers();
        this.form.reset();
    }).catch(err=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
    });
  }

  removeCustomer(uuid:string){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro que deseas eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result:any) => {
      if (result.value) {
        Swal.fire('Un momento...');
        Swal.showLoading();

        this.customerService.removeCustomer(uuid).then(()=>{
          Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado correctamente',
            showConfirmButton: false,
            timer: 5000
          });
          this.getCustomers();
        }).catch(err=>{
          Swal.hideLoading();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });
        });
      }
    }); 
  }

  openModal(content:TemplateRef<any>,action:string,customer:any) {
    
    //this.ngbModalOptions.size='lg'
    if(action=='create'){
      this.form.reset();
      this.modalTitle="Crear Cliente";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }else{
      this.uuid=customer.customer;
      this.form.patchValue({
        firstname: customer.firstname.toUpperCase(),
        lastname: customer.lastname.toUpperCase(),
        route: customer.route,
        email: customer.email,
        address: customer.address
      });
      this.modalTitle="Actualizar Cliente";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }
  }

}
