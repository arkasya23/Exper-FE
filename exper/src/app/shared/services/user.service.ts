import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RestService } from "./rest.service";

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

    login(): Observable<any> {
        throw new Error("Method not implemented.");
    }   
}