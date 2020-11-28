it("should never exceed the qulaity of an item above 50 ", function() {
    const shopItems = [new Item("Ski Mask", 10, 52)] ;
    const expectedResult =  [new Item("Ski Mask", 9, 50)] ;
    const gildedRose = new Shop(shopItems);
    const items = gildedRose.update_quality();
    expect(items).toEqual(expectedResult);
});