import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  public colors = colors;
  public loaded: boolean = false;
  public fetching: boolean = true;
  public data: any = {};

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userService.getDepositedData().then((data) => {
      this.data = data;
      this.fetching = false;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 10);
  }

  public openDetail() {
    this.modalService.openModal('DepositDetailComponent', {});
  }
}
