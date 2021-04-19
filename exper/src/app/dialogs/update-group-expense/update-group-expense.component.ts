import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'dialog-update-group-expense',
  templateUrl: 'update-group-expense.component.html',
  styleUrls: ['update-group-expense.component.scss']
})
export class DialogUpdateGroupExpenseComponent implements OnInit {
  groupExpenses = [];
  description = '';
  amount = '';
  divideBetweenAllMembers = false;
  users = [];
  checkedUsers = [];
    
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateGroupExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tripService: TripService
  ) {
  }
      
  ngOnInit(): void {
    this.description = this.data.expense.description;
    this.amount = this.data.expense.amount;
    this.divideBetweenAllMembers = this.data.expense.divideBetweenAllMembers;
    if(this.divideBetweenAllMembers === true) {
      this.users = this.data.trip.users;
      this.users.forEach(user => {
        this.checkedUsers.push({
          id: user.id,
          email: user.email,
          checked: true
        });
      });
    }
    else {
      let expenseUsers = this.data.expense.users;
      expenseUsers.forEach(user => {
        if(expenseUsers.includes(user)) {
          this.checkedUsers.push({
            id: user.id,
            email: user.email,
            checked: true
          });
        }
        else{
          this.checkedUsers.push({
            id: user.id,
            email: user.email,
            checked: false
          });
        }
      })
    }
  }

  onSave(){
    let userIds = this.checkedUsers.filter(x => x.checked === true).map(x => x.id);
    let payload = {
        description: this.description,
        amount: this.amount,
        divideBetweenAllMembers: this.divideBetweenAllMembers,
        userIds: userIds
    };

    this.tripService.updateGroupExpense(this.data.expense.id, payload).subscribe(result => {
        console.log(result);
        this.dialogRef.close(result);
    },
    err => {
        console.log(err);
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  toggleTripMembers(checked) {
    this.divideBetweenAllMembers = checked;
    this.checkedUsers.forEach(user => {
        user.checked = checked;
    });
  }

  toggleUser(user, event) {   
    user.checked = event.checked;
  }
}