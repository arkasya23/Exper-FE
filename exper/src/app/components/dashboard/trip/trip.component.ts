import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { $ } from "protractor";
import { TripModel } from "src/app/shared/models/trip.model";
import { TripService } from "src/app/shared/services/trip.service";


@Component({
  selector: 'app-trip',
  templateUrl: 'trip.component.html',
  styleUrls: ['trip.component.scss']
})
export class TripComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() trips: any;
  @Input() updatedTrips;

  panelOpenState = false;
  members: [];

  constructor(
    private http: HttpClient,
    private tripService: TripService){
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.updatedTrips.firstChange && changes.updatedTrips.currentValue !== undefined) {
      this.trips.push(changes.updatedTrips.currentValue); 
    }
  }

  ngAfterViewInit(): void {
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;  
    }, 
    err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.loadTrips();
  }

  handleDeletedUser(trip, user) {
    let currentTrip = this.trips.filter(t => t.id === trip.id);
    let remainingUsers = currentTrip[0].users.filter(u => u.id !== user.id);
    currentTrip[0].users = remainingUsers;
  }

}