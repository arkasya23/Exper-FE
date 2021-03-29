import { Observable } from "rxjs";
import { RegisterModel } from "./shared/models/register.model";

export interface IExperApiService {
    register(registerModel: RegisterModel): Observable<any>;
    login(): Observable<any>;
}