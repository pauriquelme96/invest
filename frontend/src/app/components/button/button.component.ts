import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../../../../DevTools/controls/button.controller';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() ctrl: Button = new Button();

  constructor() {}

  ngOnInit(): void {}

  public getClass() {
    let baseClass = ['button'];

    if (this.ctrl.fetching) {
      baseClass.push('button-primary');
    } else {
      baseClass.push(this.ctrl.status);
      switch (this.ctrl.status) {
        case 'warn':
          baseClass.push('button-warning');
          break;
        case 'error':
          baseClass.push('button-error');
          break;
        case 'success':
          baseClass.push('button-success');
          break;
        default:
          baseClass.push('button-primary');
      }
    }

    return baseClass.join(' ');
  }

  public getIcon() {
    let baseIcon: any = false;

    if (this.ctrl.fetching) {
      baseIcon = 'fi fi-rr-spinner spin-it';
    } else {
      switch (this.ctrl.status) {
        case 'warn':
          baseIcon = 'fi fi-rr-exclamation';
          break;
        case 'error':
          baseIcon = 'fi fi-rr-cross-circle';
          break;
        case 'success':
          baseIcon = 'fi fi-rr-check';
          break;
      }
    }

    return baseIcon;
  }
}
