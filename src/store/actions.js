export const ADD_REPO_TO_FAV = 'ADD_REPO_TO_FAV';
export const REMOVE_REPO_FROM_NAV = 'REMOVE_REPO_FROM_NAV';
export const REMOVE_ALL_REPOS = 'REMOVE_ALL_REPOS';
export const GET_REPOS_FROM_API = 'GET_REPOS_FROM_API';
export const ADD_REPOS_TO_STATE = 'ADD_REPOS_TO_STATE';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const REMOVE_IS_LOADING = 'REMOVE_IS_LOADING';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export const addRepoToFav = (repo) => {
    return {
        type: ADD_REPO_TO_FAV,
        value: repo,
    }
}

export const removeRepoFromFav = (repo) => {
    return {
        type: REMOVE_REPO_FROM_NAV,
        value: repo,
    }
}

export const removeAllRepos = () => {
    return {
        type: REMOVE_ALL_REPOS,
    }
}

export const getReposFromApi = (inputValue, currentPage) => {
    return async (dispatch) => {
        dispatch(setIsLoading());
        const url = inputValue
            ? `https://api.github.com/search/repositories?page=${currentPage}&per_page=20&q=${inputValue}+language:js&sort=stars&order=desc`
            : `https://api.github.com/search/repositories?page=${currentPage}&per_page=20&q=language:js&sort=stars&order=desc`;
        try {
            let response = await fetch(url);
            let json = await response.json();
            console.log(json.items);

            let newRepos = [];

            json.items.map((item) => {
                newRepos.push(item);
            });
            
            dispatch(addReposToState(newRepos));
        }
        catch (err) {
            console.log("Ошибка : " + err.name + ' но ты не парься');
        }
        dispatch(removeIsLoading());
    };
}

export const addReposToState = (repos) => {
    return {
        type: ADD_REPOS_TO_STATE,
        value: repos
    }
}

export const setIsLoading = () => {
    return {
        type: SET_IS_LOADING,
    }
}

export const removeIsLoading = () => {
    return {
        type: REMOVE_IS_LOADING,
    }
}

export const setCurrentPage = (number) => {
    return{
        type:SET_CURRENT_PAGE,
        value: number,
    }
}
