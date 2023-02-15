import {
  notEmpty,
  validEmail,
} from '../../../../../DevTools/common-validations';
import { Form } from '../../../../../DevTools/control-core/Form';
import { Input } from '../../../../../DevTools/controls/input.controller';

export const ProfileForm = () => {
  const email = new Input()
    .setLabel('Correo')
    .setPlaceholder('...')
    .setValue('jhon.doe@email.com')
    .setValidations(notEmpty(), validEmail());

  const fullName = new Input()
    .setLabel('Nombre y apellidos')
    .setPlaceholder('...')
    .setValue('Jhon Doe')
    .setDisabled(true);

  const phone = new Input()
    .setLabel('Teléfono')
    .setPlaceholder('...')
    .setType('number')
    .setValue('666777111')
    .setValidations(notEmpty());

  const postalDirection = new Input()
    .setLabel('Dirección')
    .setPlaceholder('...')
    .setValue('C/ Fake Street, 1234 Somewhere')
    .setDisabled(true);

  const idCard = new Input()
    .setLabel('DNI')
    .setPlaceholder('...')
    .setValue('88877711P')
    .setDisabled(true);

  const bank = new Input()
    .setLabel('IBAN')
    .setPlaceholder('...')
    .setValue('ES22 XXXX XXXX XXXX')
    .setDisabled(true);

  return new Form({
    email,
    fullName,
    phone,
    postalDirection,
    idCard,
    bank,
  });
};
