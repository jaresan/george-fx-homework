import React from 'react';

import {CountryName, CountryInfoContainer, imageMissing} from './currency-list.styled';
import {Image, Table} from 'antd';

const columns = [
  {
    title: 'Country',
    dataIndex: 'info',
    key: 'name',
    render: ({flagPath, name}) =>
      <CountryInfoContainer>
        <Image
          alt="Flag image"
          preview={false}
          width={32}
          src={flagPath}
          fallback={imageMissing}
        />
        <CountryName>{name}</CountryName>
      </CountryInfoContainer>
  },
  {
    title: 'Currency',
    dataIndex: ['info', 'currency'],
    key: 'currency'
  },
  {
    title: 'Buy',
    dataIndex: ['rates', 'buy'],
    key: 'buy'
  },
  {
    title: 'Sell',
    dataIndex: ['rates', 'sell'],
    key: 'sell'
  },
  {
    title: 'Middle',
    dataIndex: ['rates', 'middle'],
    key: 'middle'
  },
]

export class CurrencyList extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.data !== this.props.data || nextProps.loading !== this.props.loading;
  }

  render() {
    const {data, loading} = this.props;

    return <Table pagination={false} dataSource={data} loading={loading} columns={columns} />;
  }
}
