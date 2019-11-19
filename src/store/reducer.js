import * as actionTypes from './actions';

const initialState = {
    repos: [],
    favoritesRepos: [],
    isLoading: '',
    inputValue: '',
    currentPage: 1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_REPO_TO_FAV:
            const newRepoState = [...state.favoritesRepos];
            if (state.favoritesRepos.length) {
                if (!newRepoState.find((repo) => repo.id === action.value.id)) {
                    newRepoState.push(action.value);
                }
            } else {
                newRepoState.push(action.value);
            }
            return {
                ...state,
                favoritesRepos: newRepoState
            }
        case actionTypes.REMOVE_REPO_FROM_NAV:
            const stateBeforeRemove = [...state.favoritesRepos];
            return {
                ...state,
                favoritesRepos: stateBeforeRemove.filter((repo) => repo.id !== action.value.id)
            }
        case actionTypes.REMOVE_ALL_REPOS:
            return {
                ...state,
                favoritesRepos: []
            }
        case actionTypes.GET_REPOS_FROM_API:
            return {
                ...state
            }
        case actionTypes.ADD_REPOS_TO_STATE:
            return {
                ...state,
                repos: [...action.value]
            }
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: 'active'
            }
        case actionTypes.REMOVE_IS_LOADING:
            return {
                ...state,
                isLoading: ''
            }
        case actionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.value,
            }
    }
    return state;
}

export default reducer;