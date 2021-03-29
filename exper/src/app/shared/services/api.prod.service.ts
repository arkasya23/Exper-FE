import { Observable } from "rxjs";
import { IExperApiService } from "src/app/exper-api.service";
import { HttpClient } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { Injectable } from "@angular/core";
import { TokenModel } from "../models/token.model";
import { AppConst } from "../models/app-const";

@Injectable({providedIn: 'root'})
export class ApiProdService implements IExperApiService {
    options;
    headers;
    

    constructor(private http: HttpClient) {}

    isTokenValid() {
      const token = localStorage.getItem('token') || '';
      let parsedToken: TokenModel;

      if(token !== '') {
        parsedToken = JSON.parse(token);
        console.log(parsedToken);
      
        try {
          if(new Date(parsedToken.validUntil) >=  new Date()) {
            return true;
          }
        } catch {
          return false;
        }
      }

      return false;
    }

    updateToken(newToken) {
      localStorage.setItem('token', JSON.stringify(newToken));
    }

    register(registerModel : RegisterModel): any {
      const endpoint = 'api/Users/register';
      return this.http.post<TokenModel>(AppConst.API_HOST + endpoint, registerModel);
    }

    login(): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
}