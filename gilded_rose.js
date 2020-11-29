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
  let isAgedCheese = (item) => {
      return item.name == 'Aged Brie';
  }
  let isLegendary = (item) => {
      return item.name == 'Sulfuras, Hand of Ragnaros';
  }
  let isConcertTicket = (item) => {
      return  item.name == 'Backstage passes to a TAFKAL80ETC concert';
  }   
  
  let updateItemQuality = (item) => {
    if (
      !isAgedCheese(item) &&
      !isConcertTicket(item)
    ) {
      if (item.quality > 0) {
        if (!isLegendary(item)){
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (isConcertTicket(item)) {
          if (item.sell_in < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sell_in < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
    if (!isLegendary(item)) {
      item.sell_in = item.sell_in - 1;
    }
    if (item.sell_in < 0) {
      if (!isAgedCheese(item)) {
        if (!isConcertTicket(item)) {
          if (item.quality > 0) {
            if (!isLegendary(item)) {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  };
  
  module.exports = { Item, Shop };