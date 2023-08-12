import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup;
  currentPage : number=0;
  pageSize : number=5;
  account$! : Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage! : string;


  constructor(private fb : FormBuilder , private  accountService : AccountsService,public  authService : AuthService) { }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId:this.fb.control('')
    });
    this.operationFormGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)

    })

  }
  hamdleSearchAccount(){
    let accountId =this.accountFormGroup.value.accountId;
    this.account$=this.accountService.getAccounts(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  goToPage(page : number){
    this.currentPage=page;
    this.hamdleSearchAccount();
  }

  hundleAccountOperation(){
    let accountId :string =this.accountFormGroup.value.accountId;
    let typeOperation :string =this.operationFormGroup.value.operationType;
    let amount :number = this.operationFormGroup.value.amount;
    let description :string = this.operationFormGroup.value.description;
    let accountdestination :string = this.operationFormGroup.value.accountDestination;
    if(typeOperation=='DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.operationFormGroup.reset();
          this.hamdleSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
    else if(typeOperation=='CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.operationFormGroup.reset();
          this.hamdleSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }
    else if(typeOperation=='TRANSFER'){
      this.accountService.transfer(accountId,accountdestination, amount,description).subscribe({
        next : (data)=>{
          alert("Success Transfer");
          this.operationFormGroup.reset();
          this.hamdleSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }

  }

  }
