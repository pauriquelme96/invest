import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-collect-detail',
  templateUrl: './collect-detail.component.html',
  styleUrls: ['./collect-detail.component.scss'],
})
export class CollectDetailComponent implements OnInit {
  public colors = colors;
  public fetching = true;
  public data: any;
  public balanceData: any[] = new Array(10);

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userService.getCollectData().then((data) => {
      this.data = data;
      this.fetching = false;
    });

    this.userService.getBalance().then((data) => {
      this.balanceData = data
        .filter((item) => item.type === 'collect')
        .reverse();
    });
  }

  public closeDetail() {
    this.modalService.closeModal(0);
  }
}
