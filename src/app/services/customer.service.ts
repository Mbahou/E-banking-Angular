import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

public getCustomers():Observable<Array<Customer>>{
  return this.http.get<Array<Customer>>(environment.backendHost+"/customers")
}
public searchCustomers(keyword:string):Observable<Array<Customer>>{
  return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword)
}
public saveCustomer(cutomer :Customer):Observable<Customer>{
  return this.http.post<Customer>(environment.backendHost+"/customers",cutomer);
}
public deletecustomer(id :number){
  return this.http.delete(environment.backendHost+"/customers/"+id);
}

}