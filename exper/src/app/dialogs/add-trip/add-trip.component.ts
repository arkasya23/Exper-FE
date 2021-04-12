import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-add-trip',
  templateUrl: 'add-trip.component.html',
  styleUrls: ['add-trip.component.scss']
})
export class AddTripComponent {
  @Input() tripName;
  @Input() users;

}