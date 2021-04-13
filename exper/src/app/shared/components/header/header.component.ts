import { Component, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddTrip } from "src/app/dialogs/add-trip/add-trip.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  @Output() updatedTrips = new EventEmitter<any>();
  constructor(public dialog: MatDialog) {}

  
  openAddTripDialog() {
    const dialogRef = this.dialog.open(DialogAddTrip, {
      maxWidth: 'none',
      width: '90vw',
      panelClass: 'no-padding-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updatedTrips.emit(result);
    });
  }
}