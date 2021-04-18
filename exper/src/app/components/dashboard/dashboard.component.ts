import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {

  updatedTrips = [];

  getUpdatedTrips($event) {
    console.log($event);
    this.updatedTrips = $event;
  }
}