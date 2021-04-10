import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { TripModel } from "src/app/shared/models/trip.model";
import { TripService } from "src/app/shared/services/trip.service";


@Component({
  selector: 'app-trip',
  templateUrl: 'trip.component.html',
  styleUrls: ['trip.component.scss']
})
export class TripComponent implements OnInit {
  panelOpenState = false;

  @Input() trips;
  // trips;
  constructor(private http: HttpClient,
    private tripService: TripService){
      
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(trips => {
      console.log(trips);
      this.trips = trips;
    }, 
    err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.loadTrips();
  }

}