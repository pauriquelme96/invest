import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  public notifications = new Array(12);
  public fetching: boolean;
  public colors = colors;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    let lastMonth: string;
    this.fetching = true;
    this.userService.getNotifications().then((notifications) => {
      this.fetching = false;
      this.notifications = notifications.reverse().map((row) => {
        if (row.month !== lastMonth) {
          lastMonth = row.month;
          row.showMonth = true;
        }

        return row;
      });
    });
  }

  public goHome() {
    this.router.navigate(['home']);
  }
}
