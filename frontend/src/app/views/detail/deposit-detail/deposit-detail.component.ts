import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss'],
})
export class DepositDetailComponent implements OnInit {
  public colors = colors;
  public fetching = true;
  public data: any;
  public balanceData: any[] = new Array(10);

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userService.getDepositedData().then((data) => {
      this.data = data;
      this.fetching = false;
    });

    this.userService.getBalance().then((data) => {
      this.balanceData = data
        .filter((item) => item.type === 'deposit')
        .reverse();
    });
  }

  public closeDetail() {
    this.modalService.closeModal(0);
  }
}
