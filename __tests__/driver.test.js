'use strict';

const { pickup, socket } = require('../driver.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    storeId: '456879',
    orderID: '12356',
    customerName: 'Jane Doe',
    address: '1428 Elm Street',
  }

  let spy;

  beforeEach(()=> {
    // spy = jest.spyOn(console, 'log').mockImplementation();
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('that pickup method logs correctly', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    pickup(payload);
    jest.advanceTimersByTime(1500);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`picking up ${payload.orderID}`);
  })

  test('that the pickup method emits an intransit', () => {
    spy = jest.spyOn(socket, 'emit').mockImplementation();
    pickup(payload)
    jest.advanceTimersByTime(1500);
    expect(spy).toHaveBeenCalled();
  })

})
