import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPersonalComponent } from "src/app/dialogs/add-personal-expense/add-personal-expense.component";
import { DialogRemoveComponent } from "src/app/dialogs/remove/remove.component";
import { DialogUpdatePersonalExpenseComponent } from "src/app/dialogs/update-personal-expense/update-personal-expense.component";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'app-personal-expenses',
  templateUrl: 'personal-expenses.component.html',
  styleUrls: ['personal-expenses.component.scss']
})
export class PersonalExpensesComponent implements OnInit {
  
  @Input() trip;
  personalExpenses = [];
  selectedExpense;

  ngOnInit(): void {
    console.log(this.personalExpenses);
    this.getPersonalExpenses();
  }

  constructor(
    private http: HttpClient, 
    private tripService: TripService,
    public dialog: MatDialog
  ){
  }

  getPersonalExpenses() {
    this.tripService.getPersonalExpenses(this.trip.id).subscribe(result => {
      this.personalExpenses = result;
    },
    err => {
      console.log(err);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPersonalComponent, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.personalExpenses.push(result);
      }
    });
  }

  openRemoveDialog(expense){
    const dialogRef = this.dialog.open(DialogRemoveComponent, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip,
        componentName: 'Personal expense',
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let updatedExpenses = this.personalExpenses.filter(e => {
        e.id !== expense.id
      });

      this.personalExpenses = updatedExpenses;
    }); 
  }

  updateExpense(expense) {
    const dialogRef = this.dialog.open(DialogUpdatePersonalExpenseComponent, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip,
        componentName: 'Personal expense',
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.personalExpenses.forEach(e => {
          if(e.id === expense.id) {
            e.description = result.description;
            e.amount = result.amount;
          }
        });
      }
    }, err => {
      console.log(err);
    });

  }
}