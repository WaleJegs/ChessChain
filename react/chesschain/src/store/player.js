import firebase from '../fire';
import chesschain from '../chesschain';
import web3 from '../web3';

const SIGN_UP = 'SIGN_UP';

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
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) await firebase.database().ref('users/' + user.V.R).set(player);

        await chesschain.methods.newPlayer(username).send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
        });
        return dispatch(signUp(player));
    }



export default (state = initialPlayer, action) => {
    switch (action.type) {
        case SIGN_UP:
            return Object.assign({}, state, action.player)
        default:
            return state;
    }
}