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
      this.items.forEach(updateItemQuality);
      return this.items;
    }
  }
  
  const MAX_QUALITY = 50;
  const MIN_QUALITY = 0;
  
  let isAgedCheese = (item) => {
    return item.name == 'Aged Brie';
  };
  let isLegendary = (item) => {
    return item.name == 'Sulfuras, Hand of Ragnaros';
  };
  let isConcertTicket = (item) => {
    return item.name == 'Backstage passes to a TAFKAL80ETC concert';
  };
  
  let increaseQuality = (item) => {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;
    }
  };
  
  let decreaseQuality = (item) => {
    if (item.quality > MIN_QUALITY) {
      item.quality = item.quality - 1;
    }
  };
  
  let updateItemQuality = (item) => {
    if (isLegendary(item)) {
      return;
    }
  
    if (!isAgedCheese(item) && !isConcertTicket(item)) {
      decreaseQuality(item);
    } else {
      if (item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1;
        if (isConcertTicket(item)) {
          if (item.sell_in < 11) {
            increaseQuality(item);
          }
          if (item.sell_in < 6) {
            increaseQuality(item);
          }
        }
      }
    }
  
    item.sell_in = item.sell_in - 1;
  
    if (item.sell_in < 0) {
      if (!isAgedCheese(item)) {
        if (!isConcertTicket(item)) {
          if (item.quality > 0) {
            decreaseQuality(item);
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        increaseQuality(item);
      }
    }
  };
  
  module.exports = { Item, Shop };