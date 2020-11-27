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

const getSearchTerm = info => {
  const {code, name, currency} = info;
  return `${code} ${name} ${currency}`.toLowerCase();
};

const isValid = rates => ([code, {currency, name}]) => rates[(currency || '').toLowerCase()] && name;

const getCountryRow = rates => ([code, info]) => {
  const {currency, name} = info;
  const rate = rates[currency.toLowerCase()];

  return {
    key: code,
    info: {code, name, currency, flagPath: `flags/${code.toLowerCase()}.png`},
    rates: rate,
    searchTerm: getSearchTerm({code, ...info})
  };
};

export const parseFxData = json => {
  const {rates, baseCurrency} = parseRemoteFxData(json);

  return {
    rows: Object.entries(countryInfo).filter(isValid(rates)).map(getCountryRow(rates)),
    baseCurrency
  };
}

export const filterData = (data, filterText = '') => {
  const lowerCase = filterText.toLowerCase();
  return data.filter(({searchTerm}) => searchTerm.includes(lowerCase));
}
