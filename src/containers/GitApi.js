import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import GridSearch from '../components/GridSearch';
import GridFavor from '../components/GridFavor';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRepoToFav, removeRepoFromFav, removeAllRepos, getReposFromApi, setCurrentPage } from '../store/actions';
import Pagination from "react-js-pagination";

class GitApi extends React.Component {
    // async getApi(value, page = 1) {
    //     this.setState({ loader: 'active' })
    //     const url = value
    //         ? `https://api.github.com/search/repositories?page=${page}&per_page=20&q=${value}+language:js&sort=stars&order=desc`
    //         : `https://api.github.com/search/repositories?page=${page}&per_page=20&q=language:js&sort=stars&order=desc`;
    //     try {
    //         let response = await fetch(url);
    //         let json = await response.json();
    //         console.log(json.items);

    //         let repos = [];

    //         json.items.map((item) => {
    //             repos.push(item);
    //         });
    //         this.setState({
    //             repositories: repos,
    //             loader: ''
    //         });

    //     }
    //     catch (err) {
    //         console.log("Ошибка : " + err.name + ' но ты не парься');
    //     }

    // }
    state = {
        
        loader: '',
        currentPage: 1,
        inputValue: ''
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({
            inputValue: event.target.name.value
        })
        this.props.onAddedReposFromAPI(event.target.name.value, this.state.currentPage);
    }

    componentDidMount() {
        this.props.onAddedReposFromAPI();
    }

    handlePageChange = async (currentPage) => {
       await this.props.onSetCurrentPage(currentPage);
       await this.props.onAddedReposFromAPI(this.state.inputValue,this.props.currentPage)
    }

    buttonCheckHandler = (currentRepos, fav) => {
        if (fav) {
            if (fav.find((item) => {
                return item.id === currentRepos.id;
            })) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <Router>
                <div className="section">
                    <h1>Find your repos</h1>
                    <Navigation />
                    <div className={"load-window"}>
                        <div className="grid-wrap">
                            <Route path="/" exact>
                                <GridSearch
                                    submitHandler={this.submitHandler}
                                    addToFavHandler={this.props.onAddedRepoToFav}
                                    favorites={this.props.favoritesRepos}
                                    repos={this.props.repos}
                                    loader={this.props.isLoading}
                                    buttonCheckHandler={this.buttonCheckHandler}
                                />
                                <Pagination
                                    activePage={this.props.currentPage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={300}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange}
                                />
                            </Route>
                            <Route path="/favor">
                                <GridFavor
                                    removeFromFavHandler={this.props.onRemovedRepoFromFav}
                                    repos={this.props.favoritesRepos}
                                    deleteAllFav={this.props.onRemovedReposFromFav}
                                />
                            </Route>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        favoritesRepos: state.favoritesRepos,
        repos: state.repos,
        isLoading: state.isLoading,
        inputValue: state.inputValue,
        currentPage: state.currentPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedRepoToFav: (repo) => dispatch(addRepoToFav(repo)),
        onRemovedRepoFromFav: (repo) => dispatch(removeRepoFromFav(repo)),
        onRemovedReposFromFav: () => dispatch(removeAllRepos()),
        onAddedReposFromAPI: (value, page=1) => dispatch(getReposFromApi(value, page)),
        onSetCurrentPage: (number) =>dispatch(setCurrentPage(number)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitApi);