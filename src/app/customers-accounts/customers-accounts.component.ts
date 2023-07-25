import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customers-accounts',
  templateUrl: './customers-accounts.component.html',
  styleUrls: ['./customers-accounts.component.css']
})
export class CustomersAccountsComponent implements OnInit {
  customerId! : String;
  customer! : Customer;

  constructor(private route : ActivatedRoute,private router :Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
   }

  ngOnInit(): void {
    this.customerId =this.route.snapshot.params['id'];
  }

}
