import { Component, Input, OnInit } from "@angular/core";
import { NotificationsService } from "src/app/shared/services/notifications.service";

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications = []
  @Input() isOpen = false;

  constructor(
    private notificationsService : NotificationsService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.notificationsService.getNotifications().subscribe(result => {
        this.notifications = result;
    },
    err => {
        console.log(err);
    })
  }

}