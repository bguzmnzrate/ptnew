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
export class ClientesService {

  customers$: any;
  customersCollection;

  constructor(firestore:Firestore) {
    this.customersCollection =collection(firestore,'customers');
  };

  createCustomer(customer:any) {
    return addDoc(this.customersCollection,customer).then((value)=>{
          let uuid=value.id;
          return uuid;
        }).catch((err)=>{
          return err
     });
  };

  getCustomers():Observable<any[]>{
    return collectionData(this.customersCollection, { idField: 'customer' });
  }

  updateCustomer(customer:any,uuid:string) {
    const customerRef = doc(this.customersCollection, uuid);
    return setDoc(customerRef,customer,{ merge: true }).then((value:any)=>{
      return value.id;
    }).catch((err)=>{
      return err
    });
  }

  removeCustomer(uuid:string) {
    const customerRef = doc(this.customersCollection, uuid);
    return deleteDoc(customerRef);
  }

  searchCustomers(searchText:string):Observable<any[]>{
    searchText=searchText.toUpperCase();
    const q= query(this.customersCollection,
      orderBy("firstname"),
      orderBy("lastname"),
      startAt(searchText),
      endAt(searchText + "\uf8ff"));

    return collectionData(q, { idField: 'customer' });
  }

}
