import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// import {FormsModule} from '@angular/forms'
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TripService } from "src/app/shared/services/trip.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'dialog-add-members',
    templateUrl: 'add-members.component.html',
    styleUrls: ['add-members.component.scss'],
})
export class DialogAddMembers implements AfterViewInit {
  @ViewChild('input') input: FormControl;
  @Output() updatedUsers = new EventEmitter<any>();
  
  email: string;
  form : FormGroup;
  trip;
  userIds = [];
  checkedUsers: {email: string, id: string, checked: boolean}[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddMembers>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private tripService: TripService
  ) {}


  ngAfterViewInit(): void {
    this.input.valueChanges
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
    let users = this.getUsersToAdd();
    let updatedTrip = {
      tripId: this.data.trip.id,
      userIds: users
    };

    if(users.length > 0) {
      this.tripService.addUsers(updatedTrip).subscribe(res => { 
        this.dialogRef.close(res);
      }, err => {
        console.log('errr', err);
        this.dialogRef.close();
      });
    }
  }

  getUsersToAdd(){
    let users =[];
    this.checkedUsers.forEach(user => {
      if(user.checked === true) {
        users.push(user.id);
      }
    });
 
    return users;
  }
  
  updateUser(member, ev) {
    member.checked = ev.checked;
  }

  onCancel() {
    this.dialogRef.close();
  }
}