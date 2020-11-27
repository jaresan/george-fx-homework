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

  const refreshData = () => {
    getFxData()
      .then(parseFxData)
      .then(({rows: data}) => {
        rows.current = data;
        updateData();
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
    refreshData();
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


// class App extends React.Component {
//   state = {filterText: '', loading: true, filteredRows: []};
//
//   // componentDidMount() {
//   //   const url = new URL(window.location);
//   //   const filterText = url.hash.slice(1);
//   //   this.setState({filterText}, this.refreshData);
//   //   this.registerOnHashChange();
//   // }
//
//   onHashChange = e => {
//     const newUrl = new URL(e.newURL);
//     const filterText = newUrl.hash.slice(1);
//     this.setState({filterText}, this.updateData);
//   };
//
//   registerOnHashChange() {
//     window.onhashchange = this.onHashChange;
//   }
//
//   // refreshData = () =>
//   //   getFxData()
//   //     .then(parseFxData)
//   //     .then(({rows}) => {
//   //       this.rows = rows;
//   //       this.updateData();
//   //     })
//   //     .catch(e => {
//   //       console.error(e);
//   //       message.error('There was an error downloading the data, please try again later.')
//   //     })
//   //     .finally(() => this.setState({loading: false}))
//
//   // updateFilterText = e => {
//   //   const filterText = e.target.value;
//   //   window.location.hash = filterText;
//   //   this.setState({filterText}, this.updateData);
//   // };
//
//   // updateData = () => {
//   //   const {filterText} = this.state;
//   //
//   //   // Prevent input field typing lag
//   //   setTimeout(() => this.setState({filteredRows: filterData(this.rows, filterText)}));
//   // }
//
//   // render() {
//   //   const {loading, filteredRows} = this.state;
//   //   return (
//   //     <Layout>
//   //       <PageHeader>
//   //         <PageLogoContainer>
//   //           <img src="/logo.svg" />
//   //         </PageLogoContainer>
//   //         <PageTitle>George FX Test</PageTitle>
//   //       </PageHeader>
//   //       <PageBody>
//   //         <Affix>
//   //           <SearchBar onChange={this.updateFilterText} value={this.state.filterText}/>
//   //         </Affix>
//   //         <CurrencyList data={filteredRows} loading={loading}/>
//   //       </PageBody>
//   //     </Layout>
//   //   );
//   // }
// }

export default App;
