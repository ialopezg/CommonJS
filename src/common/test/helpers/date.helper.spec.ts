// tests/dateExtensions.test.ts
import { expect } from 'chai';
import * as sinon from 'sinon';

import '../../helpers/date.helper';
import '../../helpers/number.helper';

import {
  adjustDate,
  humanize,
  humanizeTimeDiff,
  isDST,
  isLeapYear,
  relativeTime,
  timeDiff,
} from '../../helpers/date';

describe('Date', () => {
  let clock: sinon.SinonFakeTimers;
  let date: Date;

  before(() => {
    clock = sinon.useFakeTimers(new Date('2025-02-01T09:30:00Z').getTime());
    date = new Date('2025-02-01T20:30:00Z');
  });

  after(() => {
    clock.restore();
  });

  describe('humanize', () => {
    it('should humanize.md the date correctly using the static method', () => {
      expect(Date.humanize(date, 'dddd, MMMM Do YYYY, h:mm:ss a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(Date.humanize(date, 'ddd hA')).to.equal('Sat 3PM');
      expect(Date.humanize(date, 'M Mo MM MMM MMMM')).to.equal(
        '2 2nd 02 Feb February',
      );
      expect(Date.humanize(date, 'YYYY YY')).to.equal('2025 25');
      expect(Date.humanize(date, 'D Do DD')).to.equal('1 1st 01');
      expect(Date.humanize(date, 'd do ddd dddd')).to.equal(
        '6 6th Sat Saturday',
      );
      expect(Date.humanize(date, 'DDD DDDo DDDD')).to.equal('32 32nd 032');
      expect(Date.humanize(date, 'w wo ww')).to.equal('5 5th 05');
      expect(Date.humanize(date, 'H HH')).to.equal('15 15');
      expect(Date.humanize(date, 'h hh')).to.equal('3 03');
      expect(Date.humanize(date, 'm mm')).to.equal('30 30');
      expect(Date.humanize(date, 's ss')).to.equal('0 00');
      expect(Date.humanize(date, 'a A')).to.equal('pm PM');
      expect(Date.humanize(date, 'MM/DD/YY hh:mm:ss A')).to.equal(
        '02/01/25 03:30:00 PM',
      );
    });

    it('should humanize.md the date correctly using the instance method', () => {
      expect(date.humanize('dddd, MMMM Do YYYY, h:mm:ss a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(date.humanize('ddd hA')).to.equal('Sat 3PM');
      expect(date.humanize('M Mo MM MMM MMMM')).to.equal(
        '2 2nd 02 Feb February',
      );
      expect(date.humanize('YYYY YY')).to.equal('2025 25');
      expect(date.humanize('D Do DD')).to.equal('1 1st 01');
      expect(date.humanize('d do ddd dddd')).to.equal('6 6th Sat Saturday');
      expect(date.humanize('DDD DDDo DDDD')).to.equal('32 32nd 032');
      expect(date.humanize('w wo ww')).to.equal('5 5th 05');
      expect(date.humanize('H HH')).to.equal('15 15');
      expect(date.humanize('h hh')).to.equal('3 03');
      expect(date.humanize('m mm')).to.equal('30 30');
      expect(date.humanize('s ss')).to.equal('0 00');
      expect(date.humanize('a A')).to.equal('pm PM');
    });

    it('should humanize.md the date correctly when timestamp is passed', () => {
      expect(
        Date.humanize(date.getTime(), 'dddd, MMMM Do YYYY, h:mm:ss a'),
      ).to.equal('Saturday, February 1st 2025, 3:30:00 pm');
    });

    it('should humanize.md the date correctly by function calling', () => {
      expect(humanize(date, 'dddd, MMMM Do YYYY, h:mm:ss a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
    });
  });

  describe('humanizeTimeDiff', () => {
    it('should work as a static method', () => {
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 30000))).to.equal(
        'less than a minute',
      ); // 1 minute ago
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 65000))).to.equal(
        'about a minute',
      ); // 1 minute ago
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 120000))).to.equal(
        '2 minutes',
      ); // 1 minute ago
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 46 * 60000))).to.equal(
        'about an hour',
      ); // 1 minute ago
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 7.2e6))).to.equal(
        'about 2 hours',
      ); // 1 minute ago
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 9e7))).to.equal(
        'a day',
      );
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 3.456e8))).to.equal(
        '4 days',
      );
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 2.765e9))).to.equal(
        'about a month',
      );
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 5.27e9))).to.equal(
        '2 months',
      );
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 3.119e10))).to.equal(
        'about a year',
      );
      expect(Date.humanizeTimeDiff(new Date(Date.now() - 9.461e10))).to.equal(
        '3 years',
      );
    });

    it('should work as an instance method', () => {
      expect(new Date(Date.now() - 30000).humanizeTimeDiff()).to.equal(
        'less than a minute',
      );
      expect(new Date(Date.now() - 65000).humanizeTimeDiff()).to.equal(
        'about a minute',
      );
      expect(new Date(Date.now() - 120000).humanizeTimeDiff()).to.equal(
        '2 minutes',
      );
      expect(new Date(Date.now() - 46 * 60000).humanizeTimeDiff()).to.equal(
        'about an hour',
      );
      expect(new Date(Date.now() - 7.2e6).humanizeTimeDiff()).to.equal(
        'about 2 hours',
      );
      expect(new Date(Date.now() - 9e7).humanizeTimeDiff()).to.equal('a day');
      expect(new Date(Date.now() - 3.456e8).humanizeTimeDiff()).to.equal(
        '4 days',
      );
      expect(new Date(Date.now() - 2.765e9).humanizeTimeDiff()).to.equal(
        'about a month',
      );
      expect(new Date(Date.now() - 5.27e9).humanizeTimeDiff()).to.equal(
        '2 months',
      );
      expect(new Date(Date.now() - 3.119e10).humanizeTimeDiff()).to.equal(
        'about a year',
      );
      expect(new Date(Date.now() - 9.461e10).humanizeTimeDiff()).to.equal(
        '3 years',
      );
    });

    it('should humanize.md the time diff by function calling', () => {
      const from = new Date(Date.now());
      const to = new Date(from.getTime() - 30000);

      expect(humanizeTimeDiff(timeDiff(from, to))).to.equal(
        'less than a minute',
      );
    });
  });

  describe('relativeTime', () => {
    it("should return a string ending with 'ago' for past dates (static method)", () => {
      expect(Date.relativeTime(Date.now() - 60000)).to.match(/ago$/i);
    });

    it("should return a string starting with 'in' for future dates (static method)", () => {
      expect(Date.relativeTime(new Date(Date.now() + 60000))).to.match(/^in/i); // 1 minute later
    });

    it('should work as an instance method', () => {
      expect(new Date(Date.now() - 60000).relativeTime()).to.match(/ago$/i);
      expect(new Date(Date.now() - 60000).relativeTime()).to.match(/^about/i);
    });

    it('should compute the relative time by function calling', () => {
      expect(relativeTime(new Date(Date.now() - 60000))).to.match(/ago$/i);
      expect(relativeTime(new Date(Date.now() - 60000))).to.match(/^about/i);
    });
  });

  describe('timeDiff', () => {
    it('should return a positive difference when the second date is later (static method)', () => {
      const from = new Date();
      const to = new Date(from.getTime() + 60000); // 1 minute later
      const diff = Date.timeDiff(from, to);
      expect(diff).to.equal(60000);
    });

    it('should return a negative difference when the second date is earlier (static method)', () => {
      const from = new Date();
      const to = new Date(from.getTime() - 60000); // 1 minute earlier
      const diff = Date.timeDiff(from, to);
      expect(diff).to.equal(-60000);
    });

    it('should return zero when both dates are the same (static method)', () => {
      const now = new Date();
      const diff = Date.timeDiff(now, now);
      expect(diff).to.equal(0);
    });

    it('should work as an instance method', () => {
      const now = new Date();
      const future = new Date(now.getTime() + 60000);
      expect(now.timeDiff(future)).to.equal(60000);
    });

    it('should support timestamps as parameters', () => {
      const fromTimestamp = Date.now();
      const toTimestamp = fromTimestamp + 60000;
      expect(Date.timeDiff(fromTimestamp, toTimestamp)).to.equal(60000);
      expect(Date.timeDiff(new Date(fromTimestamp), toTimestamp)).to.equal(
        60000,
      );
      expect(Date.timeDiff(fromTimestamp, new Date(toTimestamp))).to.equal(
        60000,
      );
    });

    it('should compute the time diff by function calling', () => {
      const from = new Date();
      const to = new Date(from.getTime() + 60000); // 1 minute later

      expect(timeDiff(from, to)).to.equal(60000);
    });
  });

  describe('isLeapYear', () => {
    describe('Standalone isLeapYear function', () => {
      it('should return true for leap years', () => {
        expect(isLeapYear(2024)).to.be.true;
        expect(isLeapYear(new Date(2024, 0, 1))).to.be.true;
        expect(isLeapYear(1704085200000)).to.be.true; // Timestamp for 2024-01-01
      });

      it('should return false for non-leap years', () => {
        expect(isLeapYear(-500)).to.be.false;
        expect(isLeapYear(1900)).to.be.false;
        expect(isLeapYear(new Date(1900, 0, 1))).to.be.false;
        expect(isLeapYear(new Date(1900, 0, 1).getTime())).to.be.false;
      });

      it('should throw an error for invalid inputs', () => {
        expect(() => isLeapYear('invalid' as unknown as Date)).to.throw(
          TypeError,
        );
        expect(() => isLeapYear(new Date('invalid-date'))).to.throw(TypeError);
        expect(() => isLeapYear(10000)).to.throw(TypeError);
        expect(() => isLeapYear(NaN)).to.throw(TypeError);
      });
    });

    describe('Date.isLeapYear method', () => {
      it('should return true for leap years', () => {
        expect(Date.isLeapYear(2024)).to.be.true;
        expect(Date.isLeapYear(new Date(2024, 0, 1))).to.be.true;
        expect(Date.isLeapYear(1704085200000)).to.be.true; // Timestamp for 2024-01-01
      });

      it('should return false for non-leap years', () => {
        expect(Date.isLeapYear(-500)).to.be.false;
        expect(Date.isLeapYear(1900)).to.be.false;
        expect(Date.isLeapYear(new Date(1900, 0, 1))).to.be.false;
        expect(Date.isLeapYear(new Date(1900, 0, 1).getTime())).to.be.false;
      });

      it('should throw an error for invalid inputs', () => {
        expect(() => Date.isLeapYear('invalid' as unknown as Date)).to.throw(
          TypeError,
        );
        expect(() => Date.isLeapYear(new Date('invalid-date'))).to.throw(
          TypeError,
        );
        expect(() => Date.isLeapYear(10000)).to.throw(TypeError);
        expect(() => Date.isLeapYear(NaN)).to.throw(TypeError);
      });
    });

    describe('Date.prototype.isLeapYear method', () => {
      it('should return true for leap years', () => {
        expect(new Date(2024, 0, 1).isLeapYear()).to.be.true;
        expect(new Date(2000, 0, 1).isLeapYear()).to.be.true;
      });

      it('should return false for non-leap years', () => {
        expect(Date.isLeapYear(-500)).to.be.false;
        expect(new Date(1900, 0, 1).isLeapYear()).to.be.false;
        expect(new Date(2023, 0, 1).isLeapYear()).to.be.false;
      });

      it('should throw an error for invalid dates', () => {
        expect(() => new Date('invalid-date').isLeapYear()).to.throw(TypeError);
      });

      it('should return correct results when calling isLeapYear function directly from prototype', () => {
        const date1 = new Date(2024, 0, 1);
        const date2 = new Date(1900, 0, 1);

        expect(Date.prototype.isLeapYear.call(date1)).to.be.true;
        expect(Date.prototype.isLeapYear.call(date2)).to.be.false;
      });

      it('should throw an error when calling isLeapYear function with an invalid date context', () => {
        expect(() =>
          Date.prototype.isLeapYear.call('invalid' as unknown as Date),
        ).to.throw(TypeError);
        expect(() =>
          Date.prototype.isLeapYear.call(null as unknown as Date),
        ).to.throw(TypeError);
      });
    });
  });

  describe('isDST', () => {
    describe('Standalone Function', () => {
      it('should correctly identify if the current date is in DST', () => {
        const dateInDST = new Date('2025-06-15'); // Example date in DST (for testing purpose)
        const dateNotInDST = new Date('2025-01-15'); // Example date not in DST

        expect(isDST(dateInDST)).to.be.true;
        expect(isDST(dateNotInDST)).to.be.false;
      });

      it('should return false for a date in a non-DST region', () => {
        const dateNotInDST = new Date('2025-01-15');
        expect(isDST(dateNotInDST)).to.be.false;
      });
    });

    describe('Date.prototype.isDST Method', () => {
      it('should correctly identify if the current date is in DST', () => {
        const dateInDST = new Date('2025-06-15'); // Example date in DST
        const dateNotInDST = new Date('2025-01-15'); // Example date not in DST

        expect(dateInDST.isDST()).to.be.true;
        expect(dateNotInDST.isDST()).to.be.false;
      });
    });

    describe('Date.isDST Method', () => {
      it('should correctly identify if the provided date is in DST', () => {
        const dateInDST = new Date('2025-06-15'); // Example date in DST
        const dateNotInDST = new Date('2025-01-15'); // Example date not in DST

        expect(Date.isDST(dateInDST)).to.be.true;
        expect(Date.isDST(dateNotInDST)).to.be.false;
      });

      it('should return false for a date in a non-DST region', () => {
        const dateNotInDST = new Date('2025-01-15');
        expect(Date.isDST(dateNotInDST)).to.be.false;
      });
    });
  });

  describe('adjustDate', () => {
    describe('adjustDate', () => {
      it('should add 5 days to a date string', () => {
        const result = adjustDate('2025-03-01T12:00:00', 'days', 5);
        const expected = new Date('2025-03-06T12:00:00');
        expect(result.getTime()).to.equal(expected.getTime());
      });

      it('should subtract 2 months from a timestamp', () => {
        const timestamp = 1738368000000; // 2023-02-01T00:00:00Z
        const result = adjustDate(timestamp, 'months', -2);
        const expected = new Date('2024-12-02T00:00:00.000Z');

        expect(result.getTime()).to.equal(expected.getTime());
      });

      it('should add 1 year to a Date object', () => {
        const result = adjustDate(new Date('2025-03-01T12:00:00'), 'years', 1);
        const expected = new Date('2026-03-01T12:00:00');
        expect(result.getTime()).to.equal(expected.getTime());
      });
    });

    describe('add', () => {
      it('should add 5 days to the current date', () => {
        const currentDate = new Date();
        const result = currentDate.add('days', 5);
        const expected = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days later
        expect(result.getTime()).to.equal(expected.getTime());
      });

      it('should add 3 hours to the current date', () => {
        const currentDate = new Date();
        const result = currentDate.add('hours', 3);
        const expected = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
        expect(result.getTime()).to.equal(expected.getTime());
      });
    });

    describe('subtract', () => {
      it('should subtract 7 days from the current date', () => {
        const currentDate = new Date();
        const result = currentDate.subtract('days', 7);
        const expected = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days earlier
        expect(result.getTime()).to.equal(expected.getTime());
      });

      it('should subtract 1 month from the current date', () => {
        const currentDate = new Date();
        const result = currentDate.subtract('months', 1);
        const expected = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        expect(result.getTime()).to.equal(expected.getTime());
      });
    });
  });
});
