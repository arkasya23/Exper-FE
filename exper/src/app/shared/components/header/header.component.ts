import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogAddTrip } from "src/app/dialogs/add-trip/add-trip.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  @Output() updatedTrips = new EventEmitter<any>();
  isOpen = true;
  
  constructor(
    public dialog: MatDialog,  
    private router: Router) {}

  
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

  logout() {
    localStorage.setItem('token', null);
    this.router.navigate(['/login']);
  }
}