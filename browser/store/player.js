import axios from 'axios';

const GET_PLYR_INFO = 'GET_PLYR_INFO';

const initialPlayer = {};

const getPlayer = player => ({ type: GET_PLYR_INFO, player });

export const signInThunk = (email, password) =>
    dispatch =>
    axios.post('/auth/login', { email, password })
    .then(res => {
        return dispatch(getPlayer(res.data));
    })
    .catch(err => console.log(err))

export const signUpThunk = (email, password, username, address) =>
    dispatch =>
    axios.post('/auth/signup', { email, password, username, address })
    .then(res => {
        return dispatch(getPlayer(res.data))
    })
    .catch(err => console.log(err));

export default (state = initialPlayer, action) => {
    switch (action.type) {
        case GET_PLYR_INFO:
            return Object.assign({}, state, action.player)
        default:
            return state
    }
}