import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { 
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp

}from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  budgetsCollection;

  constructor(firestore:Firestore) {
    this.budgetsCollection =collection(firestore,'budgets');
  };

  createBudget(supplie:any) {
    supplie.created= serverTimestamp();
    return addDoc(this.budgetsCollection,supplie).then((value)=>{
          let uuid=value.id;
          return uuid;
        }).catch((err)=>{
          return err
     });
  };

  getBudgets():Observable<any[]>{
    return collectionData(this.budgetsCollection, { idField: 'budget' });
  }

  updateBudget(supplie:any,uuid:string) {
    supplie.update= serverTimestamp();
    const supplieRef = doc(this.budgetsCollection, uuid);
    return setDoc(supplieRef,supplie,{ merge: true }).then((value:any)=>{
      return value.id;
    }).catch((err)=>{
      return err
    });
  }

  removeBudget(uuid:string) {
    const supplieRef = doc(this.budgetsCollection, uuid);
    return deleteDoc(supplieRef);
  }
  
}
