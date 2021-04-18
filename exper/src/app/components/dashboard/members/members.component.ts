import { Component, EventEmitter, Input, Output} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddMembers } from "src/app/dialogs/add-members/add-members.component";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
    selector: 'app-members',
    templateUrl: 'members.component.html',
    styleUrls: ['members.component.scss']
})
export class MembersComponent {
  @Input() trip;
  @Output() deletedUser = new EventEmitter<any>();
  
  constructor(
    public dialog: MatDialog,
    public tripService: TripService
    ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddMembers, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trip.users = result.users
      }
    });
  }

  deleteTripUser(user) {
    console.log(user);
    this.tripService.removeUser(this.trip.id, user.id).subscribe(result => {
      this.deletedUser.emit(user);
    }, err => {
      console.log(err);
    });

  }
}
