var chai = require('chai');

var assert = chai.assert;
var	expect = chai.expect;
var should = chai.should(); // Note that should has to be executed
var _ = require('underscore');

var messenger = require('../../libs/messenger.js');

describe('messenger', function() {
	it('Should be defined', function() {
		assert.isDefined(messenger);
	});

  describe('isValid', function(){
		it('Should return TRUE if string contains { and } ', function(){
			var msg = '{}';
			var result = messenger.isValid(msg);
			expect(result).to.equal(true);
		});

	  it('Should return FALSE if string does not contain { ', function(){
		  var msg = '}';
		  var result = messenger.isValid(msg);
		  expect(result).to.equal(false);
	  });

	  it('Should return FALSE if string does not contain } ', function(){
			var msg = '{';
		  var result = messenger.isValid(msg);
		  expect(result).to.equal(false);
	  });

	  it('Should return FALSE if string does not contain { and } ', function(){
		  var msg = 'hello world';
		  var result = messenger.isValid(msg);
		  expect(result).to.equal(false);
	  });

  });

	describe('isComplete', function(){
		it('Should throw Error if alert.db is unknown', function(){
			var alert = {
				db: 'NOT_EXPECTED_DB',
				uuid: '123456',
				facility: 'Test Facility',
				created: new Date().toJSON()
			};

			var errMsg = 'unknown database type:NOT_EXPECTED_DB';
			expect(function() {
				messenger.isComplete(alert);
			}).to.throw(errMsg);
		});

		it('Should return FALSE if alert.db is not a String', function(){

			var alert = {
				db: null,
				uuid: '123456',
				facility: 'Test Facility',
				created: new Date().toJSON()
			};

			expect(_.isString(alert.db)).to.equal(false);
			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});

		it('Should return FALSE if alert.uuid id not a String', function(){
			var alert = {
				db: 'ccu_breakdown',
				uuid: null,
				facility: 'Test Facility',
				created: new Date().toJSON()
			};

			expect(_.isString(alert.uuid)).to.equal(false);
			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});

		it('Should return FALSE if alert.facility is UNDEFINED', function(){
			var alert = {
				db: null,
				uuid: '123456',
				created: new Date().toJSON()
			};

			expect(_.isUndefined(alert.facility)).to.equal(true);
			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});

		it('Should return FALSE if alert.created is UNDEFINED', function(){
			var alert = {
				db: null,
				uuid: '123456',
				facility: 'Test Facility'
			};

			expect(_.isUndefined(alert.created)).to.equal(true);
			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});

		it('Should return TRUE if alert.db is stock_out and alert.stockLevel and alert.productType are defined', function(){
			var alert = {
				db: 'stock_out',
				uuid: '1234567890-1926177',
				facility: 'Test Facility',
				created: new Date().toJSON(),
				stockLevel: 30,
				productType: 'BCG'
			};

			var result = messenger.isComplete(alert);
			expect(result).to.equal(true);
		});

		it('Should return FALSE if alert.db is stock_out, alert.stockLevel is not defined', function(){
			var alert = {
				db: 'stock_out',
				uuid: '1234567890-1926177',
				facility: 'Test Facility',
				created: new Date().toJSON(),
				productType: 'BCG'
			};

			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});


		it('Should return FALSE if alert.db is stock_out, alert.productType is not defined', function(){
			var alert = {
				db: 'stock_out',
				uuid: '1234567890-1926177',
				facility: 'Test Facility',
				created: new Date().toJSON(),
				productType: 'BCG'
			};

			var result = messenger.isComplete(alert);
			expect(result).to.equal(false);
		});

	});

});