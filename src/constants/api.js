import { parseFxData } from '../components/currency-list/fx-data';

const fxEndpoint = '/fx.json';
export const getFxData = () =>
  fetch(fxEndpoint)
    .then(data => data.json())
    .then(json => parseFxData(json));
