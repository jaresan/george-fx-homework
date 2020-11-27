import React, { useEffect, useRef, useState } from 'react';
import { Layout, Affix, message } from 'antd';
import {CurrencyList} from './components/currency-list';
import {PageHeader, PageTitle, PageBody, PageLogoContainer, SearchBar} from './App.styled';
import { filterData, parseFxData } from './components/currency-list/fx-data';
import { getFxData } from './api/fx-data';

const registerOnHashChange = onHashChange => {
  window.onhashchange = onHashChange;
}

const App = () => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const rows = useRef([]);

  const refreshData = (filterText) => {
    getFxData()
      .then(parseFxData)
      .then(({rows: data}) => {
        rows.current = data;
        updateData(filterText);
      })
      .catch(e => {
        console.error(e);
        message.error('There was an error downloading the data, please try again later.')
      })
      .finally(() => setLoading(false))
  };

  const updateData = filterText => {
    // Prevent input field typing lag
    setTimeout(() => setFilteredRows(filterData(rows.current, filterText)));
  }

  const onHashChange = e => {
    const newUrl = new URL(e.newURL);
    const filterText = newUrl.hash.slice(1);
    setFilterText(filterText)
    updateData(filterText);
  };

  useEffect(() => {
    const url = new URL(window.location);
    const filterText = url.hash.slice(1);
    setFilterText(filterText)
    refreshData(filterText);
    registerOnHashChange(onHashChange);
  }, []);

  const updateFilterText = e => {
    const filterText = e.target.value;
    window.location.hash = filterText;
    setFilterText(filterText);
    updateData(filterText);
  };

  return (
    <Layout>
      <PageHeader>
        <PageLogoContainer>
          <img src="/logo.svg" />
        </PageLogoContainer>
        <PageTitle>George FX Test</PageTitle>
      </PageHeader>
      <PageBody>
        <Affix>
          <SearchBar onChange={updateFilterText} value={filterText}/>
        </Affix>
        <CurrencyList data={filteredRows} loading={loading}/>
      </PageBody>
    </Layout>
  );
};

export default App;
