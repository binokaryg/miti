var miti = require('../miti');
var expect = require('chai').expect;
var moment = require('moment');

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
        expect(moment("2019-04-15").isSame(miti.parseDateFromMessage("अ 12345 1 2", true))).to.be.true;
    });

    it("should return dates for Gregorian dates", function () {
        expect(moment("2019-01-02").isSame(miti.parseDateFromMessage("अ 12345 2019 01 02", false))).to.be.true;
        expect(moment("2019-01-02").isSame(miti.parseDateFromMessage("अ 12345 2019 1 2", false))).to.be.true;
    });
});

