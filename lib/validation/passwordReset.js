import {
  createValidator,
  email,
  minLength,
  required
} from './validation';

export const validatePasswordReset = createValidator({
  email: [required, email]
});

export const validateNewPassword = createValidator({
  password: [required, minLength(8)]
});
