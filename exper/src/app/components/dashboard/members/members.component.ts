import { PersonalExpensesComponent } from './../personal-expenses/personal-expenses.component';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddMembers } from "src/app/dialogs/add-members/add-members.component";
import { TripService } from "src/app/shared/services/trip.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.scss']
})
export class MembersComponent implements OnInit {
  
  @Input() trip;
  @Output() deletedUser = new EventEmitter<any>();
  private jwt = new JwtHelperService();

  constructor(
    public dialog: MatDialog,
    public tripService: TripService
  ) { }

  ngOnInit(): void {
    const currentUser = this.jwt.decodeToken(JSON.parse(sessionStorage.getItem('token')).token);
    this.trip.users = this.trip.users.map(user => {
      user.canDelete = true;
      if (user.email === this.trip.createdByUser.email) {
        user.canDelete = false;
        user.email += ' (trip owner)';
      } else if (user.email === currentUser.email) {
        user.canDelete = false;
      }
      return user;
    }).sort((a, b) => a.canDelete - b.canDelete);
  }

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
      if (result) {
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
