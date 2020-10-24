import React from 'react';
import './App.css';
import CelebsList from './components/CelebsList';
import CelebsHeader from './components/CelebsHeader';
import FavoritesList from './components/FavoritesList';
import FormContainer from './components/FormContainer';
import PaginationContainer from './components/PaginationContainer';
import Search from './components/Search';
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

      fname: '',
      lname: '',
      mname: '',
      gender: 'male',
      popularity: 0,
      interesting: false,
      popular: false,
      hbeautiful: false,

      favorites: [],
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
    e.preventDefault();
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

  handleFormChange = (e) => {
    console.log('value: ', e.target.value);
    console.log('name: ', e.target.name);
    console.log('checked: ', e.target.checked);

    const { value, name, type, checked } = e.target;

    type === 'checkbox'
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      fname,
      lname,
      mname,
      gender,
      popularity,
      interesting,
      popular,
      hbeautiful,
    } = this.state;

    let favorites = [];
    favorites = [
      ...this.state.favorites,
      {
        fname,
        lname,
        mname,
        gender,
        popularity,
        interesting,
        popular,
        hbeautiful,
      },
    ];
    // favorites.push({
    //   fname,
    //   lname,
    //   mname,
    //   gender,
    //   popularity,
    //   interesting,
    //   popular,
    //   hbeautiful,
    // });

    this.setState({ favorites });
  };
  render() {
    const { celebsData, modalContentData, favorites } = this.state;
    const {
      activePage,
      total_results,
      isLoading,
      limit,
      leftLimit,
      showModal,
    } = this.state;

    const {
      fname,
      lname,
      mname,
      gender,
      popularity,
      interesting,
      popular,
      hbeautiful,
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
            key={celebrity.id}
            celebrity={celebrity}
            showModal={showModal}
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
            modalContentData={modalContentData}
          />
        );
      });
    }
    // console.log('celebsData', celebsData);
    return (
      <div className="App">
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchClick={this.handleSearchClick}
        />

        <table>
          <CelebsHeader />
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

        <div className="form-favorites-container">
          <FormContainer
            fname={fname}
            lname={lname}
            mname={mname}
            gender={gender}
            popularity={popularity}
            interesting={interesting}
            popular={popular}
            hbeautiful={hbeautiful}
            handleFormChange={this.handleFormChange}
            handleFormSubmit={this.handleFormSubmit}
          />
          <FavoritesList favorites={favorites} />
        </div>
      </div>
    );
  }
}

export default App;
