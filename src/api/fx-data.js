const fxEndpoint = '/fx.json';

export const getFxData = () => fetch(fxEndpoint).then(data => data.json());
