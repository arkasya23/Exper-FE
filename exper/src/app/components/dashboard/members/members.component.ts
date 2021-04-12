import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddMembers } from "src/app/dialogs/add-members/add-members.component";

@Component({
    selector: 'app-members',
    templateUrl: 'members.component.html',
    styleUrls: ['members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input() trip;
  // @Output() membersLength = new EventEmitter<any>();
  
  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
    console.log('on iniiiiittt');
    console.log(this.trip);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddMembers, {
      width: '300px',
      data: {
        trip: this.trip
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        this.trip.users = result.users
      }
     
    });
  }

}
