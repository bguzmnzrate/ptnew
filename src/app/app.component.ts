import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(){

  }
  ngOnInit(): void {
    /*firebase.initializeApp({
      apiKey: "AIzaSyCjY0gBuSg5lfypgLdkKy26E92tiQg1Dls",
      authDomain: "app-web-pt.firebaseapp.com",

    });*/
  }
  titulo = 'Presupuestos Estructuras AB';

  //Item:Items[]=[
    //]

  cuadroNombreItem:string="";
  cuadroTipoItem:string="";
  cuadroUnidMedidaItem:string="";
  cuadroPrecioCostoItem:number=0;
  cuadroPrecioVentaItem:number=0;

}
