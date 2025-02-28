// tests/dateExtensions.test.ts
import { expect } from 'chai';

import '../../helpers/date.helper';
import '../../helpers/number.helper';

describe('Date Extensions', () => {
  describe('format', () => {
    const date = new Date('2025-02-01T09:30:00');

    it('should format the date correctly using the static method', () => {
      expect(Date.format(date, 'j d S')).to.equal('1 01 1st');
      expect(Date.format(date, 'l D w N')).to.equal('Saturday Sat 6 6');
      expect(Date.format(date, 'z W')).to.equal('32 05');
      expect(Date.format(date, 'n m F M t')).to.equal('2 02 February Feb 28');
      expect(Date.format(date, 'L Y y')).to.equal('false 2025 25');
      expect(Date.format(date, 'a A')).to.equal('am AM');
      expect(Date.format(date, 'g h G H')).to.equal('9 09 9 09');
      expect(Date.format(date, 'i s U')).to.equal('30 00 1738420200');
      expect(Date.format(date, 'I O P Z')).to.equal(
        'false -0500 -05:00 -18000',
      );
    });

    it('should format the date correctly using the instance method', () => {
      expect(date.format('j d S')).to.equal('1 01 1st');
      expect(date.format('l D w N')).to.equal('Saturday Sat 6 6');
      expect(date.format('z W')).to.equal('32 05');
      expect(date.format('n m F M t')).to.equal('2 02 February Feb 28');
      expect(date.format('L Y y')).to.equal('false 2025 25');
      expect(date.format('a A')).to.equal('am AM');
      expect(date.format('g h G H')).to.equal('9 09 9 09');
      expect(date.format('i s U')).to.equal('30 00 1738420200');
      expect(date.format('I O P Z')).to.equal('false -0500 -05:00 -18000');
    });

    it('should format the date correctly when timestamp is passed', () => {
      expect(Date.format(date.getTime(), 'j d S')).to.equal('1 01 1st');
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
  });
});
