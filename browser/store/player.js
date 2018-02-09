import axios from 'axios';

const GET_PLYR_INFO = 'GET_PLYR_INFO';

const player = {};

const getPlayer = info => ({ type: GET_PLYR_INFO, info });\

export const getPlayerThunk = () =>
  dispatch =>
  axios.get('/')
  .then(res => {
    return dispatch(getPlayer(res.data));
  })
  .catch(err => console.log(err))

export default (state = player, action) => {
  switch (action.type) {
    case GET_PLYR_INFO:
      return Object.assign({}, state, { info: action.info })
  }
}
