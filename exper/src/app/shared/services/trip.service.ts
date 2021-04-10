import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TripModel } from "../models/trip.model";
import { RestService } from "./rest.service";

@Injectable()
export class TripService extends RestService {
  options;
  headers;

  constructor(private http: HttpClient) {
    super(http);
  }

  getHeaderOptions() {
    let token = JSON.parse(localStorage.getItem('token')).token;
    return new HttpHeaders().set("Authorization", "Bearer " + token);
    
  }

  getTrips(): Observable<TripModel> { 
    const httpOptions = {
      headers: this.getHeaderOptions()
    };
    const endpoint = 'api/Trips';
    return this.get(endpoint, httpOptions);
  }

  addTrip(trip: TripModel): Observable<any> {
    const endpoint = 'api/Trips';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.post(endpoint, trip, this.headers);
  }


}