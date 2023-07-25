import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers?:Observable<Array<Customer>>;
  errorMessage?:string;
  searchFormGroup! :FormGroup ;

  constructor(private customerService:CustomerService, private fb :FormBuilder,private router : Router) {}



  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")

    })
    this.customers=this.customerService.getCustomers().pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

      }
      hundleSearchCustomers(){
        let kw=this.searchFormGroup?.value.keyword;
        this.customers=this.customerService.searchCustomers(kw).pipe(
          catchError(err=>{
            this.errorMessage=err.message;
            return throwError(err);
          })
        );

      }
      handleDeleteCustomer(c :Customer){
        let conf=confirm("Are you sure ?")
        if(!conf)return
        this.customerService.deletecustomer(c.id).subscribe({
          next: (resp)=>{
          this.customers=this.customers?.pipe(
            map(data=>{
              let index =data.indexOf(c);
              data.slice(index,1)
              return data;
            })
          )
          
          },
          error :(err)=>{
            console.log(err);
          }
        })
      }
      hundleCustomerAccount(customer :Customer){
        this.router.navigateByUrl("account-customers/"+customer.id,{state:customer});

      }
    }



