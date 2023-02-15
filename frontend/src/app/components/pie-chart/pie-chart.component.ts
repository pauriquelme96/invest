import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() value: number;
  @Input() maxValue: number;
  @Input() icon: string;
  @Input() color: string;
  @Input() bgColor: string;
  @Input() lineColor: string;

  public percent: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['value']?.currentValue !== undefined &&
      changes['value']?.currentValue !== null
    ) {
      this.updatePercent(Math.round((this.value / this.maxValue) * 100));
    }
  }
  constructor() {}

  ngOnInit(): void {}

  private updatePercent(newPercent: number): void {
    this.percent = 0;
    const interval = setInterval(() => {
      if (this.percent === newPercent) {
        clearInterval(interval);
      } else {
        this.percent++;
      }
    }, 10);
  }
}
