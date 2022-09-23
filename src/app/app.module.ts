import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

import { RouterModule, Routes } from '@angular/router';
import { InsumosServiciosComponent } from './components/insumos-servicios/insumos-servicios.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PresupuestosComponent } from './components/presupuestos/presupuestos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//FIREBASE
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, } from '@angular/fire/firestore';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { firebaseConfig } from '../environments/environment';
//NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from './components/iniciar-sesion/login.service';
import { DataServices } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { FullComponent } from './layouts/full/full.component';
/*
const appRoutes:Routes=[
    {path: '', component:HomeComponent},
    {path: 'nosotros', component:NosotrosComponent},
    {path: 'iniciar-sesion', component:IniciarSesionComponent},
    {path: 'clientes', component:ClientesComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'insumos-servicios', component:InsumosServiciosComponent},
    {path: 'presupuestos', component:PresupuestosComponent}

    ]*/;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    IniciarSesionComponent,
    NosotrosComponent,
    InsumosServiciosComponent,
    ClientesComponent,
    PresupuestosComponent,
    DashboardComponent,
    FullComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    //RouterModule.forRoot(appRoutes),
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [LoginService, DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
