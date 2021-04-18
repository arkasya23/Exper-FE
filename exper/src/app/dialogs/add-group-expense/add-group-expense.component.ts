import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupExpenseModel } from "src/app/shared/models/group-expense.model";
import { TripService } from "src/app/shared/services/trip.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'dialog-add-group-expense',
  templateUrl: 'add-group-expense.component.html',
  styleUrls: ['add-group-expense.component.scss']
})
export class DialogAddGroupExpense implements OnInit {
  amount = '';
  description = '';
  divideBetweenAllMembers = false;
  trip;
  users = [];

  @ViewChild('descriptionInput') descriptionInput: FormControl;
  @ViewChild('amountInput') amountInput: FormControl;

  constructor(
    public dialogRef: MatDialogRef<DialogAddGroupExpense>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private userService: UserService,
    private tripService: TripService
  ){  }

  ngOnInit(): void {
    this.trip = this.data.trip;
    this.users = this.buildExtendedUserList();
  }

  onSave(){
    let checkedUsers = [];
    let expensePayload;

    if(this.description !== '' && this.amount !== '') {
      if(this.divideBetweenAllMembers === true) {
        checkedUsers = this.users.map(x => x.id);
      }
      else{
        checkedUsers = this.users.filter(x => x.checked === true).map(x => x.id);     
      }
      
      expensePayload = {
        description: this.description,
        amount: this.amount,
        divideBetweenAllMembers: this.divideBetweenAllMembers,
        tripId: this.trip.id,
        userIds: checkedUsers
      };

      this.tripService.addGroupExpense(expensePayload).subscribe(res => {
        this.dialogRef.close(res);
      },
      err => {
          console.log(err);
      });
    }
  }

  buildExtendedUserList(){
    let newUsers = [];
    this.trip.users.forEach(user => {
      newUsers.push({
        id: user.id,
        email: user.email,
        checked: false
      });
    });

    return newUsers;
  }

  toggleTripMembers(ev){
    this.divideBetweenAllMembers = ev;
  }

  toggleUser(user, $event) {
    user.checked = $event.checked;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}