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
      expect(Date.humanize(date, 'w, l D1 Y, h:m2:s2 a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(Date.humanize(date, 'w1 hA')).to.equal('Sat 3PM');
      expect(Date.humanize(date, 'L L1 L2 L3 l l1')).to.equal(
        '2 2nd 02 02nd February Feb',
      );
      expect(Date.humanize(date, 'Y Y1')).to.equal('2025 25');
      expect(Date.humanize(date, 'D D1 D2 D3')).to.equal('1 1st 01 01st');
      expect(Date.humanize(date, 'W W1 W2 W3')).to.equal('6 6th 06 06th');
      expect(Date.humanize(date, 'd d1 d2 d3')).to.equal('32 32nd 032 032nd');
      expect(Date.humanize(date, 'K K1 K2 K3')).to.equal('5 5th 05 05th');
      expect(Date.humanize(date, 'H H1 H2 H3')).to.equal('15 15th 15 15th');
      expect(Date.humanize(date, 'h h1 h2 h3')).to.equal('3 3rd 03 03rd');
      expect(Date.humanize(date, 'm m1 m2 m3')).to.equal('30 30th 30 30th');
      expect(Date.humanize(date, 's s1 s2 s3')).to.equal('0 0th 00 00th');
      expect(Date.humanize(date, 'a A')).to.equal('pm PM');
    });

    it('should humanize the date correctly using the instance method', () => {
      expect(date.humanize('w, l D1 Y, h:m2:s2 a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
      expect(date.humanize('w1 hA')).to.equal('Sat 3PM');
      expect(date.humanize('L L1 L2 L3 l l1')).to.equal(
        '2 2nd 02 02nd February Feb',
      );
      expect(date.humanize('Y Y1')).to.equal('2025 25');
      expect(date.humanize('D D1 D2 D3')).to.equal('1 1st 01 01st');
      expect(date.humanize('W W1 W2 W3')).to.equal('6 6th 06 06th');
      expect(date.humanize('d d1 d2 d3')).to.equal('32 32nd 032 032nd');
      expect(date.humanize('K K1 K2 K3')).to.equal('5 5th 05 05th');
      expect(date.humanize('H H1 H2 H3')).to.equal('15 15th 15 15th');
      expect(date.humanize('h h1 h2 h3')).to.equal('3 3rd 03 03rd');
      expect(date.humanize('m m1 m2 m3')).to.equal('30 30th 30 30th');
      expect(date.humanize('s s1 s2 s3')).to.equal('0 0th 00 00th');
      expect(date.humanize('a A')).to.equal('pm PM');
    });

    it('should humanize the date correctly when timestamp is passed', () => {
      expect(Date.humanize(date.getTime(), 'w, l D1 Y, h:m2:s2 a')).to.equal(
        'Saturday, February 1st 2025, 3:30:00 pm',
      );
    });

    it('should humanize the date correctly by function calling', () => {
      expect(humanize(date, 'w, l D1 Y, h:m2:s2 a')).to.equal(
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
