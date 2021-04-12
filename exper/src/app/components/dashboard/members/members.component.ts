import { Component, Input} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddMembers } from "src/app/dialogs/add-members/add-members.component";

@Component({
    selector: 'app-members',
    templateUrl: 'members.component.html',
    styleUrls: ['members.component.scss']
})
export class MembersComponent {
  @Input() trip;
  
  constructor(public dialog: MatDialog) {}

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
}
