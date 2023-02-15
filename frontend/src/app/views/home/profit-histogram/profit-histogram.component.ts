import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profit-histogram',
  templateUrl: './profit-histogram.component.html',
  styleUrls: ['./profit-histogram.component.scss'],
})
export class ProfitHistogramComponent implements OnInit {
  public fetching: boolean = true;
  public data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [],
        tension: 0.7,
        borderColor: 'white',
        backgroundColor: 'white',
      },
      {
        data: [],
        tension: 0.7,
        borderColor: 'gray',
        backgroundColor: 'gray',
      },
    ],
  };

  public options = {
    type: 'line',
    stacked: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'gray',
        },
      },
      y: {
        ticks: {
          color: 'gray',
        },
      },
    },
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getHistogramData().then((profit: any) => {
      this.data.datasets[0].data = profit.now;
      this.data.datasets[1].data = profit.future;
      this.fetching = false;
    });
  }
}
