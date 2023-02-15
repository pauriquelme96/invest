import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Form } from '../../../../../DevTools/control-core/Form';
import { Button } from '../../../../../DevTools/controls/button.controller';
import { ProfileForm } from './profile.form-definition';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: Form = ProfileForm();
  public saveButton: Button = new Button()
    .setLabel('Actualizar')
    .setDisabled(true);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.form.change.subscribe(() => {
      this.saveButton.setDisabled(!this.form.isValid);
    });
  }
}
