import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddGroupExpense } from "src/app/dialogs/add-group-expense/add-group-expense.component";
import { DialogRemoveComponent } from "src/app/dialogs/remove/remove.component";
import { DialogUpdateGroupExpenseComponent } from "src/app/dialogs/update-group-expense/update-group-expense.component";
import { TripService } from "src/app/shared/services/trip.service";

@Component({
  selector: 'app-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() trip;

  groupExpenses: any = [];

  constructor(
    private http: HttpClient,
    private tripService: TripService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTripExpenses();
  }

  getTripExpenses() {
    this.tripService.getGroupExpenses(this.trip.id).subscribe(result => {
      console.log(result);
      this.groupExpenses = result;
      console.log(this.groupExpenses.length);

    }, err => {
      console.log(err);
      this.groupExpenses = [];
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddGroupExpense, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupExpenses.push(result);
        console.log(this.groupExpenses);
      }
    });
  }

  openRemoveDialog(expense) {
    const dialogRef = this.dialog.open(DialogRemoveComponent, {
      panelClass: 'no-padding-dialog',
      maxWidth: 'none',
      width: '90vw',
      data: {
        trip: this.trip,
        componentName: 'Group expense',
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let updatedExpenses = this.groupExpenses.filter(e => e.id !== expense.id);
      this.groupExpenses = updatedExpenses;
    });
  }

  updateExpense(expense) {
    const dialogRef = this.dialog.open(DialogUpdateGroupExpenseComponent, {
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
      if (result) {
        this.groupExpenses.forEach(e => {
          if (e.id === expense.id) {
            e.description = result.description;
            e.amount = result.amount;
            e.users = result.users;
            e.divideBetweenAllMembers = result.divideBetweenAllMembers
          }
        });
      }
    }, err => {
      console.log(err);
    });

  }
}