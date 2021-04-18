import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GroupExpenseModel } from "../models/group-expense.model";
import { TripModel } from "../models/trip.model";
import { RestService } from "./rest.service";

@Injectable()
export class TripService extends RestService {
  options;
  headers;

  constructor(private http: HttpClient) {
    super(http);
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

    return this.post(endpoint, trip, httpOptions);
  }

  addUsers(trip: any){
    const endpoint = 'api/Trips/addUsers';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.post(endpoint, trip, httpOptions);
  }


  addGroupExpense(groupExpense) {
    const endpoint = 'api/GroupExpenses';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.post(endpoint, groupExpense, httpOptions);
  }

  getGroupExpenses(tripId) {
    const endpoint = `api/GroupExpenses/trip/${tripId}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.get(endpoint, httpOptions);
  }


  getPersonalExpenses(tripId) {
    const endpoint = `api/PersonalExpenses/trip/${tripId}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.get(endpoint, httpOptions);
  }

  addPersonalExpense(personalExpense) { 
    const endpoint = 'api/PersonalExpenses';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.post(endpoint, personalExpense, httpOptions);
  }


  deleteGroupExpense(id) {
    const endpoint = `api/GroupExpenses/${id}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.delete(endpoint, httpOptions);

  }

  deletePersonalExpense(id) {
    const endpoint = `api/PersonalExpenses/${id}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.delete(endpoint, httpOptions);

  }


  updatePersonalExpense(id, payload) {
    const endpoint = `api/PersonalExpenses/${id}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.put(endpoint, payload, httpOptions);

  }

  updateGroupExpense(id, payload) {
    const endpoint = `api/GroupExpenses/${id}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.put(endpoint, payload, httpOptions);
  }

  removeUser(tripId, userId) {
    const endpoint = `api/Trips/${tripId}/removeUser/${userId}`;
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.delete(endpoint, httpOptions);
  }
}