import { parseFxData, filterData } from './fx-data';

const data = {
  baseCurrency: 'EUR',
  fx: [
    {
      currency: 'FJD',
      exchangeRate: {buy: 2, middle: 2.25, sell: 2.5}
    },
    {
      currency: 'TEST',
      exchangeRate: {buy: 1, middle: 2, sell: 3}
    },
    {
      currency: 'MXN',
      exchangeRate: {buy: 22.38, middle: 22.98, sell: 23.58}
    },
    {
      currency: 'BAD'
    }
  ]
};

describe('fx data parsing', () => {
  it('should parse fx data', () => {
    expect(parseFxData(data)).toEqual({
      baseCurrency: "EUR",
      rows: [
        {
          info: {
            code: "FJ",
            currency: "FJD",
            flagPath: "flags/fj.png",
            name: "Fiji"
          },
          key: "FJ",
          rates: {
            buy: 2,
            middle: 2.25,
            sell: 2.5
          },
          searchTerm: "fj fiji fjd"
        },
        {
          info: {
            code: "MX",
            currency: "MXN",
            flagPath: "flags/mx.png",
            name: "Mexico"
          },
          key: "MX",
          rates: {
            buy: 22.38,
            middle: 22.98,
            sell: 23.58
          },
          searchTerm: "mx mexico mxn"
        }
      ]
    });
  })
  it('should filter data by search term', () => {
    expect(filterData(parseFxData(data).rows, 'mex')).toEqual([{
      info: {
        code: "MX",
        currency: "MXN",
        flagPath: "flags/mx.png",
        name: "Mexico"
      },
      key: "MX",
      rates: {
        buy: 22.38,
        middle: 22.98,
        sell: 23.58
      },
      searchTerm: "mx mexico mxn"
    }])
    expect(filterData(parseFxData(data).rows, 'randomtext')).toEqual([])
  })
});
