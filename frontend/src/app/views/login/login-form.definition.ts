import { Form } from '../../../../../DevTools/control-core/Form';
import { Input } from '../../../../../DevTools/controls/input.controller';
import {
  minLength,
  notEmpty,
  validEmail,
} from '../../../../../DevTools/common-validations';

export const LoginForm = () => {
  const user = new Input()
    .setLabel('Usuario')
    .setPlaceholder('...')
    .setType('text')
    .setValidations(notEmpty(), validEmail());

  const password = new Input()
    .setLabel('Contraseña')
    .setPlaceholder('...')
    .setType('password')
    .setValidations(notEmpty(), minLength(8));

  return new Form({
    user,
    password,
  });
};
