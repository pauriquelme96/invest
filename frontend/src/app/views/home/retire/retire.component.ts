import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { colors } from 'src/style';

@Component({
  selector: 'app-retire',
  templateUrl: './retire.component.html',
  styleUrls: ['./retire.component.scss'],
})
export class RetireComponent implements OnInit {
  public colors = colors;
  public fetching = true;
  public loaded: boolean;
  public data: any;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userService.getRetireData().then((data) => {
      this.data = data;
      this.fetching = false;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 10);
  }

  public openDetail() {
    this.modalService.openModal('RetireDetailComponent', {});
  }
}
