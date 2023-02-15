import { Component, Input, OnInit } from '@angular/core';
import { colors } from 'src/style';

@Component({
  selector: 'app-notification-row',
  templateUrl: './notification-row.component.html',
  styleUrls: ['./notification-row.component.scss'],
})
export class NotificationRowComponent implements OnInit {
  public colors = colors;

  @Input() notification: {
    date: string;
    status: string;
    body: string;
    type: string;
    read: boolean;
    amount?: any;
  };

  @Input() fetching: boolean;

  constructor() {}

  ngOnInit(): void {}
}
