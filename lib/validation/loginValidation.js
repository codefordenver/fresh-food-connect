import {
  createValidator,
  required,
  email
} from './validation';

const loginValidation = createValidator({
  email: [required, email],
  password: [required]
});

export default loginValidation;
