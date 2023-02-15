import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { hasValue } from '../../../../../DevTools/utils';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrencyComponent implements OnInit {
  @Input() number: number;
  @Input() currency: 'EUR' | 'USD' = 'EUR';

  public body: string;
  public decimals: string;

  constructor() {}

  ngOnChanges(): void {
    if (!hasValue(this.number)) this.number = 0;

    this.formatNumber();
  }

  ngOnInit(): void {}

  public formatNumber() {
    const result = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: this.currency,
    }).format(this.number);

    this.body = result.split(',')[0];
    this.decimals = result.split(',')[1];
  }
}
