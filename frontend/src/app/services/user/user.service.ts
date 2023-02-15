import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';
import { initMockData } from './data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public data: any;

  constructor() {
    this.data = initMockData(1);
  }

  public getBalance(): Promise<any[]> {
    return fakeRequest(
      [...this.data.balance].map((row) => {
        return {
          month: dayjs(row.date).format('MMMM'),
          year: dayjs(row.date).format('YYYY'),
          ...row,
        };
      })
    );
  }

  public getAccount(): Promise<any[]> {
    return fakeRequest(this.data.account);
  }

  public getNotifications(): Promise<any[]> {
    return fakeRequest(
      [...this.data.notifications].map((row) => {
        return {
          month: dayjs(row.date).format('MMMM'),
          ...row,
        };
      })
    );
  }

  public getCollectData(): Promise<any[]> {
    const data = {
      invest: this.data.account - this.data.pay,
      account: this.data.account,
      benefit: Math.round((this.data.account - this.data.pay) * 0.15),
    };

    return fakeRequest({ ...data });
  }

  public getPayData(): Promise<any[]> {
    const data = {
      invest: this.data.pay,
      account: this.data.account,
      benefit: Math.round(this.data.pay * 0.15),
    };

    return fakeRequest({ ...data });
  }

  public getDepositedData(): Promise<any[]> {
    const data = {
      deposited: 0,
    };

    this.data.balance
      .filter((row) => row.type === 'deposit')
      .forEach((row) => {
        data.deposited += row.amount;
      });

    return fakeRequest({ ...data });
  }

  public getRetireData(): Promise<any[]> {
    const data = {
      retired: 0,
      safeRetire: 0,
      totalBenefit: 0,
    };

    this.data.balance
      .filter((row) => row.type === 'retire')
      .forEach((row) => {
        data.retired += row.amount * -1;
      });

    data.totalBenefit = data.retired + this.data.account;
    data.safeRetire = this.data.account - this.data.pay;

    return fakeRequest({ ...data });
  }

  public getHistogramData(): Promise<any[]> {
    const data = {
      now: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      future: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    };
    const receipts = this.data.balance.filter((row) => row.type === 'receipt');

    receipts.forEach((row) => {
      data.now[new Date(row.date).getMonth()] = row.account;
    });

    const lastReceipt = receipts[receipts.length - 1];

    for (let i = new Date(lastReceipt.date).getMonth(); i < 11; i++) {
      data.future[i] = data.now[i] || data.future[i - 1];
      data.future[i + 1] =
        (data.now[i] || data.future[i - 1]) +
        Math.round(
          ((data.now[i] || data.future[i - 1]) - this.data.pay) * 0.15
        );
    }

    return fakeRequest({ ...data });
  }
}

const fakeRequest = (data): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 600);
  });
};
