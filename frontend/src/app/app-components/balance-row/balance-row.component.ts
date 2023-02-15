import { Component, Input, OnInit } from '@angular/core';
import { colors } from 'src/style';

@Component({
  selector: 'app-balance-row',
  templateUrl: './balance-row.component.html',
  styleUrls: ['./balance-row.component.scss'],
})
export class BalanceRowComponent implements OnInit {
  @Input() balance: any;
  @Input() fetching: boolean;

  public colors = colors;

  constructor() {}

  ngOnInit(): void {}
}
