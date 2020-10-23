import React from 'react';
import './App.css';
import CelebsList from './components/CelebsList';
import PaginationContainer from './components/PaginationContainer';
import { api_key } from './secret';

const fetchJson = (activePage) => {
  const main_api = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=${activePage}`;
  return (
    fetch(main_api)
      .then((res) => res.json())
      .then((celebsData) => celebsData)
      // ideally show api error on browser
      .catch((err) => console.log(err))
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      celebsData: [],
      activePage: 1,
      total_pages: 0,
      total_results: 0,
      isLoading: true,
      limit: 20,
      leftLimit: 0,
      searchText: '',

      showModal: false,
      modalContentData: [],
    };
  }

  componentDidMount() {
    const { activePage } = this.state;
    fetchJson(activePage).then((result) => {
      this.setState({
        celebsData: result.results,
        activePage: result.page,
        total_pages: result.total_pages,
        total_results: result.total_results,
        isLoading: false,
      });
    });
  }

  handlePageChange = (pageNumber) => {
    const limit = pageNumber * this.state.celebsData.length;
    const leftLimit = (pageNumber - 1) * this.state.celebsData.length;

    fetchJson(pageNumber).then((result) => {
      this.setState({
        celebsData: result.results,
        total_pages: result.total_pages,
        total_results: result.total_results,
        activePage: pageNumber,
        isLoading: false,
        limit: limit,
        leftLimit: leftLimit,
      });
    });
  };

  handleSearchChange = (e) => {
    // use better validation maybe
    if (e.target.value !== '') {
      this.setState({ searchText: e.target.value });
    }
  };
  handleSearchClick = (e) => {
    const { activePage, searchText } = this.state;
    const search_api = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${searchText}&page=${activePage}&include_adult=false`;
    // use better validation maybe
    if (searchText !== '') {
      fetch(search_api)
        .then((res) => res.json())
        .then((result) =>
          this.setState({
            celebsData: result.results,
            total_pages: result.total_pages,
            total_results: result.total_results,
            isLoading: false,
          })
        )
        .catch((err) => console.log(err));
    }
  };

  handleOpenModal = (movie) => {
    this.setState({ showModal: true, modalContentData: movie });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { celebsData, modalContentData } = this.state;
    const {
      activePage,
      total_results,
      isLoading,
      limit,
      leftLimit,
      showModal,
    } = this.state;

    let result = (
      <tr>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
    );
    if (!isLoading && celebsData.length === 0) {
      result = (
        <tr>
          <td>No result</td>
          <td>No result</td>
          <td>No result</td>
          <td>No result</td>
        </tr>
      );
    }
    if (!isLoading && celebsData && celebsData.length > 0) {
      result = celebsData.map((celebrity) => {
        return (
          <CelebsList
            celebrity={celebrity}
            showModal={showModal}
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
            modalContentData={modalContentData}
          />
        );
      });
    }
    console.log('celebsData', celebsData);
    return (
      <div className="App">
        <div className="search-container">
          <input
            type="input"
            placeholder="Search by artist name"
            id="search"
            onChange={this.handleSearchChange}
          />
          <input
            type="button"
            value="Search"
            id="searchBtn"
            onClick={this.handleSearchClick}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Popularity</th>
              <th>Profile</th>
              <th>Known For</th>
            </tr>
          </thead>
          <tbody>{result}</tbody>
        </table>
        <PaginationContainer
          activePage={activePage}
          itemsCountPerPage={celebsData.length}
          totalItemsCount={total_results}
          onChange={this.handlePageChange}
          limit={limit}
          leftLimit={leftLimit}
        />
      </div>
    );
  }
}

export default App;
