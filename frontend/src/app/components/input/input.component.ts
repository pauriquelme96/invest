import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Input as InputCtrl } from '../../../../../DevTools/controls/input.controller';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() ctrl: InputCtrl = new InputCtrl();

  constructor() {}

  ngOnInit(): void {}
}
