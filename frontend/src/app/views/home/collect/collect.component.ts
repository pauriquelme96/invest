import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {
  public colors = colors;
  public fetching = true;
  public data: any;
  public loaded: boolean;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userService.getCollectData().then((data) => {
      this.data = data;
      this.fetching = false;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 10);
  }

  public openDetail() {
    this.modalService.openModal('CollectDetailComponent', {});
  }
}
