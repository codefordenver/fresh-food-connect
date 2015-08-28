import {createValidator, required, maxLength, email} from './validation';

const loginValidation = createValidator({
  email: [required, email],
  password: [required, maxLength(50)]
});

export default loginValidation;
