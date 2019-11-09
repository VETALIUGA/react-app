import * as actionTypes from './actions';

const initialState = {
    favoritesUsers: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_TO_FAV:
            const newUserState = [...state.favoritesUsers];
            if (newUserState.find((user) => user.id != action.value.id)) {
                newUserState.push(action.value);
            }
            return {
                ...state,
                favoritesUsers: newUserState,
            };
    }
    return state;
}

export default reducer;