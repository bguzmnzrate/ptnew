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
//rxjs
import { Observable, of, OperatorFunction,throwError } from 'rxjs';
import { 
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap
} from 'rxjs/operators';
//NgBootstrap
import {
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
//Services
import { PresupuestoService  } from './services/presupuesto.service';
import { ClientesService } from '../clientes/services/clientes.service';
import { InsumosServiciosService } from '../insumos-servicios/services/insumos-servicios.service';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  budgets:any=[];
  items:any[]=[];
  uuid:string='';
  show:boolean=true;
  show2:boolean=true;
  
  form=new FormGroup({
    projectName:new FormControl('',Validators.required),
    fullnameCustomer:new FormControl(''),
    customer:new FormControl(''),
    //routeCustomer:new FormControl('RUTA123'),
    //addressCustomer:new FormControl('aV mexico'),
    items:new FormControl(''),
    subTotal:new FormControl('',Validators.required),
    taxes:new FormControl('',Validators.required),
    total:new FormControl('',Validators.required),
  });

  supplieForm=new FormGroup({
    supplie: new FormControl(''),
    description: new FormControl(''),
  });

  //ModalOptions
  modalTitle:string="Crear Presupuesto";
  action:string="create";
  ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size:'lg'
  };

  searchCustomer = (text$: Observable<string>) => {
      return text$.pipe(      
          debounceTime(200), 
          distinctUntilChanged(),
          // switchMap allows returning an observable rather than maps array
          switchMap( (searchText:string) =>
            this.customerService.searchCustomers(searchText)),
          /*catchError(error=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message
            });
          })  */            
      );                 
  };

  searchSupplie = (text$: Observable<string>) => {
      return text$.pipe(      
          debounceTime(200), 
          distinctUntilChanged(),
          // switchMap allows returning an observable rather than maps array
          switchMap( (searchText:string) =>
            this.supplieService.searchSupplie(searchText)),
          /*catchError(error=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message
            });
          })  */            
      );                 
  };

  formatter = (x: {firstname: string,lastname: string}) =>{
    let name;
    if(x.firstname)
      name=x.firstname+' '+x.lastname
      return name||''
  };

  formatter2 = (x: {description: string}) =>{
    let description;
    if(x.description)
      description=x.description
      return description||''
  };

  constructor(
    private fb: FormBuilder,
    private budgetService:PresupuestoService,
    public customerService:ClientesService,
    private modalService: NgbModal,
    public supplieService:InsumosServiciosService
  ) { }

  ngOnInit(): void {
    this.getBudgets();
  }

  createBudget(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let budget=this.form.value;
    budget.items=this.items;
    //budget.subTotal=this.items.reduce((pv,cv)=>parseInt(pv) + parseInt(cv.salePrice),0)

    this.budgetService.createBudget(budget).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Presupuesto creado correctamente',
          showConfirmButton: false,
          timer: 5000
        });
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

  getBudgets(): void {
    this.budgetService.getBudgets().subscribe((data:any)=>{
      this.budgets=data;
    },(error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

  updateBudget(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let budget=this.form.value;
    budget.items=this.items;
    //budget.subTotal=this.items.reduce((pv,cv)=>parseInt(pv) + parseInt(cv.salePrice),0)

    let uuid=this.uuid;

    this.budgetService.updateBudget(budget,uuid).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Presupuesto actualizado correctamente',
          showConfirmButton: false,
          timer: 5000
        });
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

  removeBudget(uuid:string){
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

        this.budgetService.removeBudget(uuid).then(()=>{
          Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            title: 'Presupuesto eliminado correctamente',
            showConfirmButton: false,
            timer: 5000
          });
          this.getBudgets();
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

  openModal(content:TemplateRef<any>,action:string,budget:any) {
    this.form.controls.fullnameCustomer.enable();
    this.supplieForm.controls.description.enable();
    this.form.controls.projectName.enable();
    this.form.controls.customer.enable();
    this.form.controls.subTotal.enable();
    this.form.controls.taxes.enable();
    this.form.controls.total.enable();
    this.supplieForm.controls.description.enable();

    if(action=='create'){
      this.show=true;
      this.show2=true;
      this.form.reset();
      this.items=[];
      this.modalTitle="Crear Presupuesto";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }else if(action=='update'){
      this.show=true;
      this.show2=true;
      this.items=budget.items;
      this.uuid=budget.budget;
      this.form.patchValue({
        projectName: budget.projectName,
        customer:budget.customer,
        subTotal: budget.subTotal,
        taxes: budget.taxes,
        total: budget.total
      });
      let customer={
        firstname:budget.customer.firstname,
        lastname:budget.customer.lastname
      }
      this.form.controls.fullnameCustomer.setValue(customer);
      this.form.controls.fullnameCustomer.disable();

      this.modalTitle="Actualizar Presupuesto";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }else if(action=='view'){

      this.items=budget.items;
      this.uuid=budget.budget;
      this.form.patchValue({
        projectName: budget.projectName,
        customer:budget.customer,
        subTotal: budget.subTotal,
        taxes: budget.taxes,
        total: budget.total
      });
      let customer={
        firstname:budget.customer.firstname,
        lastname:budget.customer.lastname
      }
      this.form.controls.fullnameCustomer.setValue(customer);
      this.form.controls.fullnameCustomer.disable();
      this.form.controls.projectName.disable();
      this.form.controls.customer.disable();
      this.form.controls.subTotal.disable();
      this.form.controls.taxes.disable();
      this.form.controls.total.disable();
      this.supplieForm.controls.description.disable();
      this.show=false;
      this.show2=false;
      this.modalTitle="Imprimir Presupuesto";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;

    }
  }

  addItem(data:any):void{
    let item=data.item;
    this.supplieForm.controls.description.disable();
    this.supplieForm.patchValue({
        supplie:item
    })
    if(this.items?.find(
        (itemS:any)=>
        itemS?.supplie==item?.supplie)==undefined){
      this.items?.push(item);
    }
    let subTotal=this.items.reduce((pv,cv)=>parseInt(pv) + parseInt(cv.salePrice),0)
    this.form.controls.subTotal.setValue(subTotal);
  }

  removeItem(supplie:string):void{
    this.items= this.items?.filter((item:any)=> 
      item.supplie!==supplie);
    let subTotal=this.items.reduce((pv,cv)=>parseInt(pv) + parseInt(cv.salePrice),0)
    this.form.controls.subTotal.setValue(subTotal);
  }

  patchValue(data:any,value:string):void{
    let item=data.item;
    if(value=='customer'){
      this.form.controls.fullnameCustomer.disable();
      this.form.patchValue({
        customer:item
      });
    }
  }

  clean(value:string):void{
    if(value=='customer'){
      this.form.controls.fullnameCustomer.enable();
      this.form.patchValue({
        customer:null,
        fullnameCustomer:null
      })
    }

    this.supplieForm.controls.description.enable();
    this.supplieForm.patchValue({
      supplie:null,
      description:null
    });
    
  }

}
