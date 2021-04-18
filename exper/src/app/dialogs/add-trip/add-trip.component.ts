import { AfterViewInit, Component, Inject, Input, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { TripModel } from "src/app/shared/models/trip.model";
import { TripService } from "src/app/shared/services/trip.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'dialog-add-trip',
  templateUrl: 'add-trip.component.html',
  styleUrls: ['add-trip.component.scss']
})
export class DialogAddTrip implements AfterViewInit {
  @Input() tripName;
  @Input() users;
  @ViewChild('emailInput') emailInput: FormControl;

  email;
  checkedUsers: {email: string, id: string, checked: boolean}[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddTrip>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private tripService: TripService
    ) {
  }
  
  
  ngAfterViewInit(): void {
    this.emailInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(res=> {
        this.userService.findByEmailStartWith(res).subscribe(result => {
          if(result.length > 0){
            result.forEach(r => {  
              this.checkedUsers.push({email: r.email, id: r.id, checked: false});
            })
          }
          else {
            this.checkedUsers = [];
          }

        }, 
        err => {
          this.checkedUsers = [];
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    let trip = new TripModel();
    console.log(this.tripName);
    trip.name = this.tripName;
    trip.userIds = [];

    this.checkedUsers.forEach(user => {
      if(user.checked === true) {
        trip.userIds.push(user.id);
      }
    });

   trip.groupSize = trip.userIds.length; 

    this.tripService.addTrip(trip).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
    });
  }

  updateUser(member, ev) {
    member.checked = ev.checked;
  }
}