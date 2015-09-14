import loginValidation from '../lib/validation/loginValidation';
import chai from 'chai';

const expect = chai.expect;

describe('loginValidation', () => {
  it('should pass validation with an email and password', () => {
    const email = 'john.doe@example.com';
    const password = 'abcdefghijklmnopqrstuvwxyz';

    const validation = loginValidation({
      email,
      password
    });

    expect(validation.valid).to.be.true;
  });
});
