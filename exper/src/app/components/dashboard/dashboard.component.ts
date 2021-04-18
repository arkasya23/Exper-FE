import { NotificationsService } from './../../shared/services/notifications.service';
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    updatedTrips = [];

    constructor(
        private notificationsService: NotificationsService
    ) { }

    ngOnInit(): void {
        this.notificationsService.startFetching();
    }

    getUpdatedTrips($event) {
        console.log($event);
        this.updatedTrips = $event;
    }
}