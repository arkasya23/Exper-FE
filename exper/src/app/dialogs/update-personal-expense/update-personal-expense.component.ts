import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'dialog-update-personal-expense',
  templateUrl: 'update-personal-expense.component.html',
  styleUrls: ['update-personal-expense.component.scss']
})
export class DialogUpdatePersonalExpenseComponent implements OnInit {
  description = this.data.trip.description;
  amount = '';
      
  constructor(
    public dialogRef: MatDialogRef<DialogUpdatePersonalExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.description = this.data.expense.description;
    this.amount = this.data.expense.amount;
  }
   
  onSave(){
    let personalExpensePaylod = {
      description: this.description,
      amount: this.amount,
      tripId: this.data.trip.id
    };

    this.tripService.updatePersonalExpense(this.data.expense.id, personalExpensePaylod).subscribe(result => {
      this.dialogRef.close(result);
    },
    err => {
      console.log(err);
    })
  }
    
  onNoClick(){
    this.dialogRef.close();
  }

}