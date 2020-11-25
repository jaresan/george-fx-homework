import React from 'react';
import { Layout, Affix, message } from 'antd';
import {CurrencyList} from './components/currency-list';
import {PageHeader, PageTitle, PageBody, PageLogoContainer, SearchBar} from './App.styled';
import { filterData } from './components/currency-list/fx-data';
import { getFxData } from './constants/api';

class App extends React.Component {
  state = {filterText: '', currencyData: '', loading: true, filteredData: []};

  componentDidMount() {
    const url = new URL(window.location);
    const filterText = url.searchParams.get('search') || '';
    this.setState({filterText}, this.refreshData);
  }

  refreshData = () =>
    getFxData()
      .then(data => {
        this.data = data;
        this.updateData();
      })
      .catch(e => {
        console.error(e);
        message.error('There was an error downloading the data, please try again later.')
      })
      .finally(() => this.setState({loading: false}))

  updateFilterText = e => {
    const filterText = e.target.value;
    window.history.replaceState({}, '', filterText ? `?search=${filterText}` : '/');
    this.setState({filterText}, this.updateData);
  };

  updateData = () => {
    const {filterText} = this.state;

    // Prevent input field typing lag
    setTimeout(() => this.setState({filteredData: filterData(this.data, filterText)}));
  }

  render() {
    const {loading, filteredData} = this.state;
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
            <SearchBar onChange={this.updateFilterText} value={this.state.filterText}/>
          </Affix>
          <CurrencyList data={filteredData} loading={loading}/>
        </PageBody>
      </Layout>
    );
  }
}

export default App;
