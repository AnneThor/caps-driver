'use strict';

const { pickup, intransit } = require('../driver.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    storeId: '456879',
    orderID: '12356',
    customerName: 'Jane Doe',
    address: '1428 Elm Street',
  }

  let pickupEvent = { event: 'pickup' };
  let inTransitEvent = { event: 'in-transit' };

  let spy;

  beforeEach(()=> {
    spy = jest.spyOn(console, 'log').mockImplementation();
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('that pickup method logs correctly', () => {
    pickup(payload, pickupEvent);
    jest.advanceTimersByTime(1500);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderID}`);
  })

  test('that in-transit method logs correctly', () => {
    intransit(payload, inTransitEvent);
    jest.advanceTimersByTime(3000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`DRIVER: delivered order ${payload.orderID}`);
  })

})
