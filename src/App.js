import React from 'react';
import {Layout, Affix} from 'antd';
import {CurrencyList} from './components/currency-list';
import {PageHeader, PageTitle, PageBody, PageLogoContainer, SearchBar} from './App.styled';
import { filterData } from './components/currency-list/fx-data';
import { getFxData } from './constants/api';

class App extends React.Component {
  state = {filterText: '', currencyData: '', loading: true, data: []};

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () =>
    getFxData().then(data => {
      this.data = data;
      this.setState({data, loading: false})
    })

  updateFilterText = e => {
    const text = e.target.value;
    this.setState({data: filterData(this.data, text)});
  };

  render() {
    const {loading, data} = this.state;
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
            <SearchBar onChange={this.updateFilterText}/>
          </Affix>
          <CurrencyList data={this.state.data} loading={loading}/>
        </PageBody>
      </Layout>
    );
  }
}

export default App;
