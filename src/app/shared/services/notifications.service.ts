import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotificationMessageModel } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  message: BehaviorSubject<NotificationMessageModel> =
    new BehaviorSubject<NotificationMessageModel>(undefined);

  constructor() {}
}
