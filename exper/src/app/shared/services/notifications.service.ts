import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { RestService } from "./rest.service";

@Injectable()
export class NotificationsService extends RestService implements OnDestroy {
  options;
  headers;
  intervalId = undefined;
  notificationsSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
    super(http);
  }

  ngOnDestroy(): void {
    this.stopFetching();
  }

  getNotifications() {
    const endpoint = 'api/Notifications';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.get(endpoint, httpOptions);
  }

  getNotificationsAsObservable(): Observable<any> {
    return this.notificationsSubject.asObservable();
  }

  startFetching(): void {
    this.intervalId = setInterval(() => {
      this.getNotifications().subscribe(result => {
        this.notificationsSubject.next(result);
      })
    }, 3000);
  }

  stopFetching(): void {
    clearInterval(this.intervalId);
  }

}