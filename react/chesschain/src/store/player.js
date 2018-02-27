import firebase from '../fire';
import chesschain from '../chesschain';
import web3 from '../web3';

// action types
const SIGN_UP = 'SIGN_UP';
const LOGIN = 'LOGIN';
const MESSAGE = 'MESSAGE';

const initialPlayer = {
    master: '',
    balance: '',
    value: '',
    message: '',
    username: '',
    email: '',
    password: '',
    address: '',
};


export const signUp = player => ({ type: SIGN_UP, player });
export const logIn = player => ({ type: LOGIN, player });
export const setMessage = message => ({ type: MESSAGE, message });


export const signUpThunk = (email, password, username, address, value) =>
    async dispatch => {
        const accounts = await web3.eth.getAccounts();
        let player = {
            username,
            email,
            password,
            address,
            value
        }
        dispatch(setMessage('Waiting on transaction success...'));
        let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) await firebase.database().ref('users/' + user.V.R).set(player);
        console.log('here')
        dispatch(setMessage('Account created...'));
        await chesschain.methods.newPlayer(username).send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
        });

        dispatch(`Welcome to ChessChain ${username}`);
        return dispatch(signUp(player));
    }


export const loginThunk = (email, password) => {
    return async dispatch => {
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email, password);
            let info = await firebase.database().ref(`/users/${user.V.R}`).once('value')
            let player = {
                username: info.child('username').node_.value_,
                email,
                password,
                address: info.child('address').node_.value_,
                value: info.child('initialValue').node_.value_
            }
            console.log('here')
            dispatch(setMessage(`Welcome to ChessChain ${player.username}`));
            return dispatch(logIn(player));
        } catch (e) {
            dispatch(setMessage(e.message))
        }
    }
}


export default (state = initialPlayer, action) => {
    switch (action.type) {
        case SIGN_UP:
            return Object.assign({}, state, action.player);
        case LOGIN:
            return Object.assign({}, state, action.player);
        case MESSAGE:
            return Object.assign({}, state, action.message)
        default:
            return state;
    }
}