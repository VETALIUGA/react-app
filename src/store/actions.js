export const ADD_USER_TO_FAV = 'ADD_USER_TO_FAV';

export const addUserToFav = (user) => {
    return {
        type: ADD_USER_TO_FAV,
        value: user,
    }
}