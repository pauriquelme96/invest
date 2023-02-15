import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.scss'],
})
export class BasicHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() path: string;
  @Input() iconRight: string = 'fi fi-rr-menu-burger';
  @Input() pathRight: string = 'home';
  @Input() raise: boolean = true;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {}

  public openMenu() {
    this.modalService.openModal('MenuComponent', {});
  }

  public navigate() {
    this.router.navigate([this.path]);
  }
}
