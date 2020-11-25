import { indexBy, prop, toLower, pipe, path } from 'ramda';
import countryInfo from '../../constants/countryInfo.json';

const getCurrency = prop('currency');
const getFxData = prop('fx');

const parseRemoteFxData = json => ({
  ...json,
  rates: indexBy(pipe(getCurrency, toLower), getFxData(json))
});

export const parseFxData = json => {
  const {rates} = parseRemoteFxData(json);
  return Object.entries(countryInfo).reduce((acc, [code, {currency, name}]) => {
    const rate = path([toLower(currency || ''), 'exchangeRate'], rates);
    if (!rate || !name) {
      return acc;
    }
    return acc.concat({
      key: code,
      info: {code, name, currency, flagPath: `flags/${code.toLowerCase()}.png`},
      rates: rate,
      searchTerm: `${code.toLowerCase()} ${name.toLowerCase()} ${currency.toLowerCase()}`
    })
  }, []);
}

export const filterData = (data, filterText = '') => {
  const lowerCase = filterText.toLowerCase();
  return data.filter(({searchTerm}) => searchTerm.includes(lowerCase));
}
