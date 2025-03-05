import { expect } from 'chai';

import { LessThan } from '../../common/decorators';

describe('LessThan Decorator', () => {
  // Define a simple class that uses the decorator.
  class Product {
    @LessThan(0)
    public price: number;

    constructor(price: number) {
      this.price = price;
    }
  }

  it('should create a Product if price is less than 0', () => {
    const product = new Product(10);
    expect(product.price).to.equal(10);
  });

  it('should throw an error if price is equal to 0', () => {
    expect(() => new Product(0)).to.throw(Error, /must be less than 0/);
  });

  it('should throw an error if price is greater than 0', () => {
    expect(() => new Product(-5)).to.throw(Error, /must be less than 0/);
  });

  it('should allow updating price to a valid value', () => {
    const product = new Product(10);
    product.price = 20;
    expect(product.price).to.equal(20);
  });

  it('should throw an error when updating price to an invalid value', () => {
    const product = new Product(10);
    expect(() => {
      product.price = 0;
    }).to.throw(Error, /must be less than 0/);
  });
});
