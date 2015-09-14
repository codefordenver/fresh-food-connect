import {
  createValidator,
  email,
  minLength,
  required
} from './validation';

const signupValidation = createValidator({
  email: [required, email],
  password: [required, minLength(8)]
});

export default signupValidation;
