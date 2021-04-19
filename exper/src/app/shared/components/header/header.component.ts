import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogAddTrip } from "src/app/dialogs/add-trip/add-trip.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() updatedTrips = new EventEmitter<any>();
  isOpen = true;
  hasNotifications: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.notificationsService.getNotificationsAsObservable()
        .subscribe(result => {
          this.hasNotifications = result?.length > 0;
        })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openAddTripDialog() {
    const dialogRef = this.dialog.open(DialogAddTrip, {
      maxWidth: 'none',
      width: '90vw',
      panelClass: 'no-padding-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updatedTrips.emit(result);
    });
  }

  logout() {
    this.notificationsService.stopFetching();
    sessionStorage.setItem('token', null);
    this.router.navigate(['/login']);
  }
}