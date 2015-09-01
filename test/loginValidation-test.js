import loginValidation from '../lib/validation/loginValidation';
import chai from 'chai';

var assert = require("assert");
var expect = chai.expect;

describe('loginValidation', function () {
	it('should pass validation with an email and password', function(){
		let email = "john.doe@example.com";
		let password = "abcdefghijklmnopqrstuvwxyz";

		let validation = loginValidation({
			email,
			password
		});

		assert(validation.valid);
	});

	it('should not pass validation with a password longer than 50 characters', function(){
		let email = "john.doe@example.com";
		let password = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";

		let validation = loginValidation({
			email,
			password
		});
		
		expect(validation.valid).to.be.false;
	});
});