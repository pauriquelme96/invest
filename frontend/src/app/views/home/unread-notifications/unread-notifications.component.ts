import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-unread-notifications',
  templateUrl: './unread-notifications.component.html',
  styleUrls: ['./unread-notifications.component.scss'],
})
export class UnreadNotificationsComponent implements OnInit {
  public fetching: boolean;
  public unreadNotifications: any[] = new Array(3);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetching = true;
    this.userService.getNotifications().then((notifications) => {
      this.unreadNotifications = notifications
        .filter((item) => !item.read)
        .reverse();

      this.fetching = false;
    });
  }
}
