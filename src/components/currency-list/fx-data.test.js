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

describe('fx data handling', () => {
  describe('#parseFxData()', () => {
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
  })

  describe('#filterData()', () => {
    it('should return no rows for no matching search terms', () => {
      const rows = [{
        key: "FJ",
        searchTerm: "fj fiji fjd"
      }];
      expect(filterData(rows, 'country')).toEqual([]);
    });

    it('should return rows matching search terms', () => {
      const rows = [{
        key: "FJ",
        searchTerm: "fj fiji fjd"
      }];

      const res = filterData(rows, 'fj');

      expect(res).toEqual([{key: "FJ", searchTerm: "fj fiji fjd"}]);
    });

    it('should all rows for empty search string', () => {
      const rows = [{
        key: "FJ",
        searchTerm: "fj fiji fjd"
      }];

      const res = filterData(rows, '');

      expect(res).toEqual([{key: "FJ", searchTerm: "fj fiji fjd"}]);
    });
  })
})
