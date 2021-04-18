import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'dialog-remove',
  templateUrl: 'remove.component.html',
  styleUrls: ['remove.component.scss']
})
export class DialogRemoveComponent implements OnInit{
  componentName = '';

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.componentName = this.data.componentName;
  }

  remove() {
    if(this.data.componentName == 'Personal expense') {
      this.tripService.deletePersonalExpense(this.data.expense.id).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      }, err => {
        console.log(err);
        this.dialogRef.close();
      })
    }
    else{
      this.tripService.deleteGroupExpense(this.data.expense.id).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      }, err => {
        console.log(err);
        this.dialogRef.close();
      })
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}