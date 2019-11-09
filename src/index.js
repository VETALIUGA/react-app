import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GridSearch from './components/GridSearch'
import GridFavor from './components/GridFavor'
import Navigation from './components/Navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reducer from './store/reducer'
import { connect } from 'react-redux';
import { addUserToFav } from './store/actions'

const store = createStore(reducer);

class GitApi extends React.Component {
    async getApi(value) {
        this.setState({ loader: 'active' })
        const url = value
            ? `https://api.github.com/search/repositories?q=${value}+language:js&sort=stars&order=desc`
            : 'https://api.github.com/search/repositories?q=language:js&sort=stars&order=desc';
        try {
            let response = await fetch(url);
            let json = await response.json();
            console.log(json.items);

            let repos = [];

            json.items.map((item) => {
                repos.push(item);
            });
            this.setState({
                repositories: repos,
                loader: ''
            });

        }
        catch (err) {
            console.log("Ошибка : " + err.name + ' но ты не парься');
        }

    }
    state = {
        repositories: [

        ],
        loader: '',
        favorites: [

        ],
    }

    submitHandler = (event) => {
        event.preventDefault();
        const searchQuery = event.target.name.value;
        this.getApi(searchQuery);
    }

    addToFavHandler = (item) => {
        let newArr;
        if (this.state.favorites) {
            newArr = [... this.state.favorites];
        }
        else {
            newArr = [];
        }
        const checkedArr = newArr.filter((elem) => {
            return elem.id == item.id;
        });
        if (checkedArr.length == 0) {
            newArr.push(item);
            this.setState({
                favorites: newArr
            })
            localStorage.setItem("favorites", JSON.stringify(newArr));
        }
    }

    removeFromFavHandler = (item) => {
        const newFav = this.state.favorites.filter((elem) => {
            return elem.id != item.id;
        });
        console.log(newFav);
        this.setState({
            favorites: newFav
        });
        localStorage.setItem("favorites", JSON.stringify(newFav));
    }

    componentDidMount() {
        this.getApi();
        const local = localStorage.getItem("favorites");
        console.log(JSON.parse(local));
        this.setState({
            favorites: JSON.parse(local)
        });
    }

    deleteAllFav = () => {
        this.setState({
            favorites: []
        });
        localStorage.setItem("favorites", JSON.stringify([]));
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
                                <GridSearch submitHandler={this.submitHandler} addToFavHandler={this.props.onAddedUsersToFav} favorites={this.state.favorites} repos={this.state.repositories} loader={this.state.loader} />
                            </Route>
                            <Route path="/favor">
                                <GridFavor removeFromFavHandler={this.removeFromFavHandler} repos={this.state.favorites} deleteAllFav={this.deleteAllFav} />
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
        favoritesUsers: state.favoritesUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedUsersToFav: (user) => dispatch(addUserToFav(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitApi);

ReactDOM.render(
    <Provider store={store}>
        <GitApi />
    </Provider>,
    document.getElementById('root')
);
