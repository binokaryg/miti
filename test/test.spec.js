var miti = require('../miti');
var expect = require('chai').expect;
var moment = require('moment');

describe("Date Parser Tests", function () {
    it("should find date string", function () {
        expect(miti.getDateStringFromMessage("अ 12345 2076 01 02")).to.equal("2076 01 02");
        expect(miti.getDateStringFromMessage("अ 12345 2076 01 02"), 3).to.equal("2076 01 02");
        expect(miti.getDateStringFromMessage("अ 12345 1 2"), 3).to.equal("1 2");
        expect(miti.getDateStringFromMessage("A 12345 Jan 1, 2013"), 3).to.equal("Jan 1, 2013");
    });

    it("should return Gregorian Dates", function () {
        expect(moment("2019-04-15").isSame(miti.parseDateFromMessage("अ 12345 2076 01 02", true))).to.be.true;
        expect(moment("2019-01-02").isSame(miti.parseDateFromMessage("अ 12345 2019 01 02", false))).to.be.true;
    })
});