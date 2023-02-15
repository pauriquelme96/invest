import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  public colors = colors;
  public balance: any[] = new Array(12);
  public fetching: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetching = true;

    let lastMonth: string;
    let lastYear: string;
    this.userService.getBalance().then((balance: any[]) => {
      this.balance = balance
        .map((row) => {
          if (lastYear !== row.year) {
            lastYear = row.year;
            row.showYear = true;
          }

          return row;
        })
        .reverse()
        .map((row) => {
          if (lastMonth !== row.month) {
            lastMonth = row.month;
            row.showMonth = true;
          }

          return row;
        });
      this.fetching = false;
    });
  }
}
