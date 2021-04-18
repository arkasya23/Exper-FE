import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";

@Injectable()
export class NotificationsService extends RestService {
  options;
  headers;

  constructor(private http: HttpClient) {
    super(http);
  }

  getNotifications(){
    const endpoint = 'api/Notifications';
    const httpOptions = {
      headers: this.getHeaderOptions()
    };

    return this.get(endpoint, httpOptions);
  }

}