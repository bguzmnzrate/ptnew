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
import { InsumosServiciosService  } from './services/insumos-servicios.service';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insumos-servicios',
  templateUrl: './insumos-servicios.component.html',
  styleUrls: ['./insumos-servicios.component.css']
})
export class InsumosServiciosComponent implements OnInit {

  supplies:any[]=[];
  uuid:string='';

  form=new FormGroup({
    description:new FormControl('',Validators.required),
    type:new FormControl('',Validators.required),
    unit:new FormControl('',Validators.required),
    costPrice:new FormControl('',Validators.required),
    salePrice:new FormControl('',Validators.required),
  });


  //ModalOptions
  modalTitle:string="Crear Insumo";
  action:string="create";
  ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size:'lg'
  };

  constructor(
    private fb: FormBuilder,
    private supplieService:InsumosServiciosService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getSupplies();
  }

  createSupplie(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let supplie=this.form.value;
    supplie.description=supplie.description.toUpperCase();
    this.supplieService.createSupplie(supplie).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Insumo creado correctamente',
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

  getSupplies(): void {
    this.supplieService.getSupplies().subscribe(data=>{
      this.supplies=data;
    },(error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

  updateSupplie(): void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    let supplie=this.form.value;
    supplie.description=supplie.description.toUpperCase();

    let uuid=this.uuid;

    this.supplieService.updateSupplie(supplie,uuid).then((uuid:any)=>{
      Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Insumo actualizado correctamente',
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

  removeSupplie(uuid:string){
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

        this.supplieService.removeSupplie(uuid).then(()=>{
          Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            title: 'Insumo eliminado correctamente',
            showConfirmButton: false,
            timer: 5000
          });
          this.getSupplies();
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

  /*searchSupplie(searchText:string): void {
    this.supplieService.searchSupplie(searchText).subscribe(data=>{
      console.log(data)
    },(error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }*/


  openModal(content:TemplateRef<any>,action:string,supplie:any) {
    if(action=='create'){
      this.form.reset();
      this.modalTitle="Crear Insumo";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }else{
      this.uuid=supplie.supplie;
      this.form.patchValue({
        description:supplie.description.toUpperCase(),
        type: supplie.type,
        unit: supplie.unit,
        costPrice: supplie.costPrice,
        salePrice: supplie.salePrice
      });
      this.modalTitle="Actualizar Insumo";
      this.modalService.open(content,this.ngbModalOptions);
      this.action=action;
    }
  }

}
