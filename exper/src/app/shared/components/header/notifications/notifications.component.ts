import { OnDestroy } from "@angular/core";
import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NotificationsService } from "src/app/shared/services/notifications.service";

@Component({
    selector: 'app-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

    @Input() isOpen = false;
    notifications = [];
    subscriptions: Subscription[] = [];

    constructor(
        private notificationsService: NotificationsService
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.notificationsService.getNotificationsAsObservable()
                .subscribe(notifications => {
                    this.notifications = notifications;
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}