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
  query,
  where,
  orderBy,
  startAt,
  endAt
}from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InsumosServiciosService {
  supplies$: any;
  suppliesCollection;

  constructor(firestore:Firestore) {
    this.suppliesCollection =collection(firestore,'supplies');
  };

  createSupplie(supplie:any) {
    return addDoc(this.suppliesCollection,supplie).then((value)=>{
          let uuid=value.id;
          return uuid;
        }).catch((err)=>{
          return err
     });
  };

  getSupplies():Observable<any[]>{
    return collectionData(this.suppliesCollection, { idField: 'supplie' });
  }

  updateSupplie(supplie:any,uuid:string) {
    const supplieRef = doc(this.suppliesCollection, uuid);
    return setDoc(supplieRef,supplie,{ merge: true }).then((value:any)=>{
      return value.id;
    }).catch((err)=>{
      return err
    });
  }

  removeSupplie(uuid:string) {
    const supplieRef = doc(this.suppliesCollection, uuid);
    return deleteDoc(supplieRef);
  }

  searchSupplie(searchText:string):Observable<any[]>{
    searchText=searchText.toUpperCase();
    const q= query(this.suppliesCollection, where("description", ">=", searchText),
      orderBy("description"),
      startAt(searchText),
      endAt(searchText + "\uf8ff"));

    return collectionData(q, { idField: 'supplie' });
  }
  
}
