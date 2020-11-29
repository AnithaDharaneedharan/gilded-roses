
// Classes and their constructors
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

// Defining constants
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

// Abstracting condition checks on item types  to functions

let isAgedCheese = (item) => {
  return item.name == 'Aged Brie';
};

let isLegendary = (item) => {
  return item.name == 'Sulfuras, Hand of Ragnaros';
};

let isConcertTicket = (item) => {
  return item.name == 'Backstage passes to a TAFKAL80ETC concert';
};

let isNormalItem = (item) =>
  !isAgedCheese(item) && !isConcertTicket(item) && !isLegendary(item);

// Abstracting condition checks on quality and sellIn to functions

let isExpired = (item) => {
  return item.sell_in < 0;
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

let decreaseSellin = (item) => {
  item.sell_in = item.sell_in - 1;
};

// Defining update functions for different items

const updateNormalItems = (item) => {
  decreaseSellin(item);
  decreaseQuality(item);

  if (isExpired(item)) {
    decreaseQuality(item);
  }
};

const updateAgedCheeseItems = (item) => {
  decreaseSellin(item);
  increaseQuality(item);

  if (isExpired(item)) {
    increaseQuality(item);
  }
};

const updateConcertTicketItems = (item) => {
  decreaseSellin(item);
  increaseQuality(item);
  if (item.sell_in < 11) {
    increaseQuality(item);
  }
  if (item.sell_in < 6) {
    increaseQuality(item);
  }

  if (isExpired(item)) {
    item.quality = MIN_QUALITY;
  }
};

const updateLegendaryItems = (item) => {
  return item;
};

// Invokes the respective update function based on the item

let updateItemQuality = (item) => {
  if (isLegendary(item)) {
    updateLegendaryItems(item);
  }
  if (isAgedCheese(item)) {
    updateAgedCheeseItems(item);
  }
  if (isConcertTicket(item)) {
    updateConcertTicketItems(item);
  }
  if (isNormalItem(item)) {
    updateNormalItems(item);
  }
};

module.exports = { Item, Shop };
