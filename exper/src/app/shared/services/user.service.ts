import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RestService } from "./rest.service";
import { LoginModel } from "../models/login.model";

@Injectable()
export class UserService extends RestService {
  options;
  headers;
  
  constructor(private http: HttpClient) {
    super(http);
  }

  updateToken(newToken) {
    localStorage.setItem('token', JSON.stringify(newToken));
  }

  register(registerModel : RegisterModel): Observable<any> {
    const endpoint = 'api/Users/register';
    return this.post(endpoint, registerModel);
  }

  login(loginModel: LoginModel): Observable<any> {
    const endpoint = 'api/Users/login';
    return this.post(endpoint, loginModel);
  }   
  
  findByEmailStartWith(email: string): Observable<any>{
    const endpoint = 'api/Users/findByEmailStartsWith';

    const params = new HttpParams()
      .set('email', email);

    const httpOptions = {
      headers: this.getHeaderOptions(),
      params: params
    };
      
    return this.get(endpoint, httpOptions);
  }
}