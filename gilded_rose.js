class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  update_quality() {
    if (this.items.length > 0) {
      this.items.forEach((item) => {
        const isSulfuras = item.name == 'Sulfuras, Hand of Ragnaros';
        const isAgedBrie = item.name == 'Aged Brie';
        const isBackstagePasses =
          item.name == 'Backstage passes to a TAFKAL80ETC concert';
        const isQualityGreaterThan0 = item.quality > 0;
        const isQualityLesserThan50 = item.quality < 50;
        const isTenDaysOrLessToSell = item.sell_in <= 10;
        const isFiveDaysOrLessToSell = item.sell_in <= 5;
        const isNormalItem = !isAgedBrie && !isBackstagePasses && !isSulfuras;

        if (!isSulfuras) {
          item.sell_in = item.sell_in - 1;
        }

        if (isNormalItem) {
          if (isQualityGreaterThan0) {
            item.quality = item.quality - 1;
          }
        } else {
          if (isQualityLesserThan50) {
            item.quality = item.quality + 1;
            if (isBackstagePasses) {
              if (isTenDaysOrLessToSell) {
                item.quality = item.quality + 1;
              }
              if (isFiveDaysOrLessToSell) {
                item.quality = item.quality + 1;
              }
            }
          }
        }

        if (item.sell_in < 0) {
          if (!isAgedBrie) {
            if (!isBackstagePasses) {
              if (isQualityGreaterThan0 && !isSulfuras) {
                item.quality = item.quality - 1;
              }
            } else {
              item.quality = item.quality - item.quality;
            }
          } else {
            if (isQualityLesserThan50) {
              item.quality = item.quality + 1;
            }
          }
        }
      });
    }
    return this.items;
  }
}

module.exports = { Item, Shop };
