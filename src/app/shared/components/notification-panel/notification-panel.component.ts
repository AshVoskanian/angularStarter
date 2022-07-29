import { Component, OnInit } from "@angular/core";
import { NotificationMessageModel } from "../../models/models";
import { NotificationsService } from "../../services/notifications.service";

@Component({
  selector: "app-notification-panel",
  templateUrl: "./notification-panel.component.html",
  styleUrls: ["./notification-panel.component.scss"],
})
export class NotificationPanelComponent implements OnInit {
  message: NotificationMessageModel;

  timeout;
  timer: number = 3000;

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  subscribeToMessages() {
    this.timer = 3000;
    this.notificationsService.message.subscribe((res) => {
      this.message = res;
      if (this.message) {
        if (this.message.time) {
          this.timer = this.message.time;
        }
        clearTimeout(this.timeout);
        this.startTimeout();
      }
      // else {
      //   this.startTimeout();
      // }
    });
  }

  startTimeout() {
    this.timeout = setTimeout(() => {
      this.message = undefined;
    }, this.timer);
  }

  closeNotification() {
    this.notificationsService.message.next(undefined);
  }
}
