// tests/dateExtensions.test.ts
import { expect } from 'chai';
import * as sinon from 'sinon';

import '../../helpers/date.helper';
import '../../helpers/number.helper';
import {
  humanize,
  humanizeTimeDiff,
  relativeTime,
  timeDiff,
} from '../../helpers';

describe('Date Extensions', () => {
  describe('humanize', () => {
    let clock: sinon.SinonFakeTimers;
    let date: Date;

    before(() => {
      clock = sinon.useFakeTimers(new Date('2025-02-01T09:30:00Z').getTime());
      date = new Date('2025-02-01T20:30:00Z');
    });

    after(() => {
      clock.restore();
    });

    it('should humanize the date correctly using the static method', () => {
      expect(Date.humanize(date, 'dddd, MMMM Do YYYY, h:mm:ss a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(Date.humanize(date, 'ddd hA')).to.equal('Sat 3PM');
      expect(Date.humanize(date, 'M Mo MM MMM MMMM')).to.equal(
        '2 2nd 02 Feb February',
      );
      expect(Date.humanize(date, 'YYYY YY')).to.equal('2025 25');
      expect(Date.humanize(date, 'D Do DD')).to.equal('1 1st 01');
      expect(Date.humanize(date, 'd do dd ddd dddd')).to.equal('6 6th 06 Sat Saturday');
      expect(Date.humanize(date, 'DDD DDDo DDDD')).to.equal('32 32nd 032');
      expect(Date.humanize(date, 'w wo ww')).to.equal('5 5th 05');
      expect(Date.humanize(date, 'H HH')).to.equal('15 15');
      expect(Date.humanize(date, 'h hh')).to.equal('3 03');
      expect(Date.humanize(date, 'm mm')).to.equal('30 30');
      expect(Date.humanize(date, 's ss')).to.equal('0 00');
      expect(Date.humanize(date, 'a A')).to.equal('pm PM');
      expect(Date.humanize(date, 'MM/DD/YY hh:mm:ss A')).to.equal('02/01/25 03:30:00 PM');
    });

    it('should humanize the date correctly using the instance method', () => {
      expect(date.humanize('dddd, MMMM Do YYYY, h:mm:ss a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(date.humanize('ddd hA')).to.equal('Sat 3PM');
      expect(date.humanize('M Mo MM MMM MMMM')).to.equal(
        '2 2nd 02 Feb February',
      );
      expect(date.humanize('YYYY YY')).to.equal('2025 25');
      expect(date.humanize('D Do DD')).to.equal('1 1st 01');
      expect(date.humanize('d do dd ddd dddd')).to.equal('6 6th 06 Sat Saturday');
      expect(date.humanize('DDD DDDo DDDD')).to.equal('32 32nd 032');
      expect(date.humanize('w wo ww')).to.equal('5 5th 05');
      expect(date.humanize('H HH')).to.equal('15 15');
      expect(date.humanize('h hh')).to.equal('3 03');
      expect(date.humanize('m mm')).to.equal('30 30');
      expect(date.humanize('s ss')).to.equal('0 00');
      expect(date.humanize('a A')).to.equal('pm PM');
    });

    it('should humanize the date correctly when timestamp is passed', () => {
      expect(
        Date.humanize(date.getTime(), 'dddd, MMMM Do YYYY, h:mm:ss a'),
      ).to.equal('Saturday, February 1st 2025, 3:30:00 pm');
    });

    it('should humanize the date correctly by function calling', () => {
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

    it('should humanize the time diff by function calling', () => {
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
});
