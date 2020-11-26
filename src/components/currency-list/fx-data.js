import { indexBy, prop, toLower, pipe, map } from 'ramda';
import countryInfo from '../../constants/countryInfo.json';

const getCurrency = prop('currency');
const getFxData = prop('fx');
const getExchangeRate = prop('exchangeRate');
const getBaseCurrency = prop('baseCurrency');

const parseRemoteFxData = json => ({
  ...json,
  baseCurrency: getBaseCurrency(json),
  rates: map(getExchangeRate, indexBy(pipe(getCurrency, toLower), getFxData(json)))
});

export const parseFxData = json => {
  const {rates, baseCurrency} = parseRemoteFxData(json);

  return Object.entries(countryInfo).reduce((acc, [code, {currency, name}]) => {
    const rate = rates[(currency || '').toLowerCase()];
    if (!rate || !name) {
      return acc;
    }

    acc.rows.push({
      key: code,
      info: {code, name, currency, flagPath: `flags/${code.toLowerCase()}.png`},
      rates: rate,
      searchTerm: `${code} ${name} ${currency}`.toLowerCase()
    });

    return acc;
  }, {rows: [], baseCurrency});
}

export const filterData = (data, filterText = '') => {
  const lowerCase = filterText.toLowerCase();
  return data.filter(({searchTerm}) => searchTerm.includes(lowerCase));
}
