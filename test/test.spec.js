var miti = require('../miti');
var expect = require('chai').expect;
var moment = require('moment');
var mockDate = require('mockdate');

describe("Tests", function () {
    it("test moment formats", function () {
        expect(moment('Aug 15', "MMM DD").isSame(moment("2020-08-15").toDate()));
    });
});


describe("Format Guesser Tests", function () {
    it("should guess YYYY MM DD correctly", function () {
        expect(miti.guessFormat("2019 01 01")).to.equal("YYYY MM DD");
        expect(miti.guessFormat("2019 2 1")).to.equal("YYYY MM DD");
    });
    it("should guess MM DD correctly", function() {
        expect(miti.guessFormat("01 01")).to.equal("MM DD");
    });
});

describe("BS Year Guesser Tests", function () {
    it("should guess this year correctly", function () {
        expect(miti.guessBSYearForPastDate("01 01")).to.equal("2076")
        expect(miti.guessBSYearForPastDate("10 15")).to.equal("2076");
    });
    it("should guess last year correctly", function() {
        expect(miti.guessBSYearForPastDate("10 29")).to.equal("2075");
        expect(miti.guessBSYearForPastDate("12 29")).to.equal("2075");
    });
});

describe("Date Parser Tests", function () {
    it("should find date string", function () {
        expect(miti.getDateStringFromMessage("अ 12345 2076 01 02")).to.equal("2076 01 02");
        expect(miti.getDateStringFromMessage("अ 12345 2076 01 02"), 3).to.equal("2076 01 02");
        expect(miti.getDateStringFromMessage("अ 12345 1 2"), 3).to.equal("1 2");
        expect(miti.getDateStringFromMessage("A 12345 Jan 1, 2013"), 3).to.equal("Jan 1, 2013");
    });

    it("should return dates for Bikram Sambat", function () {
        expect(moment("2019-04-15").isSame(miti.parseDateFromMessage("अ 12345 2076 01 02", true))).to.be.true;
        expect(moment("2019-04-15").isSame(miti.parseDateFromMessage("अ 12345 2076 1 2", true))).to.be.true;
    });

    it("should return dates for Gregorian dates", function () {
        expect(moment("2019-01-02").isSame(miti.parseDateFromMessage("अ 12345 2019 01 02", false))).to.be.true;
        expect(moment("2019-01-02").isSame(miti.parseDateFromMessage("अ 12345 2019 1 2", false))).to.be.true;
    });
});

describe("Date Parser tests when only Month and Date are given", function() {
    before(function() {
        //Need a static "current" date
        mockDate.set(moment("2020-02-01"));//BS: 2076-10-18
    });
    after(function() {
        mockDate.reset();
    })
    it("should return date for Bikram Sambat dates", function () {
        expect(moment("2019-04-15").isSame(miti.parseDateFromMessage("अ 12345 1 2", true))).to.be.true;
        expect(moment("2019-02-24").isSame(miti.parseDateFromMessage("अ 12345 11 12", true))).to.be.true;
    });
})

