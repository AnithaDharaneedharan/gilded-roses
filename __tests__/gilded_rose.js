const { Item, Shop } = require('../gilded_rose.js');

describe('Gilded Rose for normal items', function () {
  it('should return quality equal or above 0 for normal items ', function () {
    const shopItems = [new Item('Ski Mask', 9, 0)];
    const expectedResult = [new Item('Ski Mask', 8, 0)];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });

  it('should return sellIn-1 for normal items ', function () {
    const shopItems = [new Item('Ski Mask', 9, 6)];
    const expectedResult = [new Item('Ski Mask', 8, 5)];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });

  it('should degrade the quality twice as fast (-2) after the sellIn date expires ', function () {
    const shopItems = [new Item('Ski Mask', 0, 16)];
    const expectedResult = [new Item('Ski Mask', -1, 14)];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
});

describe('Gilded Rose for Aged Brie', function () {
  it('should increase the quality of aged brie by 1 ', function () {
    const shopItems = [new Item('Aged Brie', 1, 1)];
    const expectedResult = [new Item('Aged Brie', 0, 2)];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });

  it('should never increase the quality of Aged Brie above 50 ', function () {
    const shopItems = [new Item('Aged Brie', 1, 50)];
    const expectedResult = [new Item('Aged Brie', 0, 50)];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
});

describe('Backstage passes to a TAFKAL80ETC concert', () => {
  it('should increase in Quality as its sellIn approaches', () => {
    const shopItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 14, 0),
    ];
    const expectedResult = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 13, 1),
    ];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
  it('should increase in Quality by 2 when 10days or less', () => {
    const shopItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0),
    ];
    const expectedResult = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 2),
    ];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
  it('should increase in Quality by 3 when 5days or less', () => {
    const shopItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 4, 0),
    ];
    const expectedResult = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 3, 3),
    ];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });

  it('should drop the Quality to 0 after concert finishes', () => {
    const shopItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
    ];
    const expectedResult = [
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0),
    ];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
});

describe('Sulfuras, Hand of Ragnaros', () => {
  it('should never sell this legendary item which has quality that never changes from 80', () => {
    const shopItems = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    ];
    const expectedResult = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    ];
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
  });
});

