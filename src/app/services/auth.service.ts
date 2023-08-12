import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean =false;
  roles : any;
  username  : any ;
  accesToken! : any;

  constructor(private http :HttpClient,private router: Router) { }

  public login(username : string, password : string){
    let options ={
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams()
      .set("username",username).set("password",password);
    return this.http.post("http://localhost:9400/auth/login", params, options);

  }

  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accesToken=data["acces-Token"];
    let  decodeJwt:any =  jwtDecode(this.accesToken);
    this.username=decodeJwt.sub;
    this.roles=decodeJwt.scope;
    window.localStorage.setItem("jwt-Token",this.accesToken);



  }

  logout() {
    this.isAuthenticated=false;
    this.accesToken=undefined;
    this.username=undefined;
    this.roles=undefined;
  }

  loadJwtTokenFronmLocalStorage() {
    let token=window.localStorage.getItem("jwt-Token");
    if (token){
      this.loadProfile({"acces-Token" : token});
      this.router.navigateByUrl("/admin/customers")

    }
  }
}
