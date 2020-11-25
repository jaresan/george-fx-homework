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

export const CurrencyList = ({data, loading}) => (
  <Table pagination={false} dataSource={data} loading={loading} columns={columns} />
)
