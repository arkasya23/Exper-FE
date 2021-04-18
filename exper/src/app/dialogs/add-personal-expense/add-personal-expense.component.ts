import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'dialog-add-personal-expense',
  templateUrl: 'add-personal-expense.component.html',
  styleUrls: ['add-personal-expense.component.scss']
})
export class DialogAddPersonalComponent implements OnInit {
  description = '';
  amount = '';
      
  constructor(
    public dialogRef: MatDialogRef<DialogAddPersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tripService: TripService
  ) {}

  
  ngOnInit(): void {
    console.log(this.data);
  }

  onSave(){
    let personalExpensePaylod = {
      description: this.description,
      amount: this.amount,
      tripId: this.data.trip.id
    };

    this.tripService.addPersonalExpense(personalExpensePaylod).subscribe(result => {
      this.dialogRef.close(result);
    },
    err => {
      console.log(err);
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }
}