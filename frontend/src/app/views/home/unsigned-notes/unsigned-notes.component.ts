import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-unsigned-notes',
  templateUrl: './unsigned-notes.component.html',
  styleUrls: ['./unsigned-notes.component.scss'],
})
export class UnsignedNotesComponent implements OnInit {
  public fetching: boolean;
  public unsignedReceipts: any[] = new Array(3);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetching = true;
    this.userService.getBalance().then((balance) => {
      this.unsignedReceipts = balance
        .filter((item) => item.type === 'receipt')
        .reverse()
        .slice(0, 5);

      this.fetching = false;
    });
  }
}
