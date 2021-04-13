import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
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
    if(!changes.updatedTrips.firstChange && changes.updatedTrips.currentValue.length > 0) {
      this.trips.push(changes.updatedTrip.currentValue); 
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

}